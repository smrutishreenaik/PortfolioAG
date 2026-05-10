import React, { useState, useEffect } from "react";
import { Table, Form, Modal, Card, Spinner } from "react-bootstrap";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { Project } from "../../types";
import useToast from "../../hooks/useToast";
import ToastContainer from "../../components/ToastContainer";
import adminStyles from "./Admin.module.scss";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";

const MAX_DESC_LENGTH = 300;

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [featuresStr, setFeaturesStr] = useState("");
  const [techStackStr, setTechStackStr] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toasts, showToast, dismissToast } = useToast();

  const projectsCollectionRef = collection(db, "projects");

  const fetchProjects = async () => {
    try {
      const data = await getDocs(projectsCollectionRef);
      setProjects(
        data.docs.map(
          (document) => ({ ...document.data(), id: document.id }) as Project,
        ),
      );
    } catch {
      showToast("Failed to load projects.", "error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setCurrentProject({});
    setFeaturesStr("");
    setTechStackStr("");
    setIsEditing(false);
  };

  const handleShow = (project?: Project) => {
    if (project) {
      setCurrentProject(project);
      setFeaturesStr(project.features.join("\n"));
      setTechStackStr(project.techStack.join(", "));
      setIsEditing(true);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const features = featuresStr.split("\n").filter((f) => f.trim() !== "");
      const techStack = techStackStr
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== "");
      const imageUrl = currentProject.imageUrl || "";

      if (isEditing && currentProject.id) {
        const projDoc = doc(db, "projects", currentProject.id);
        await updateDoc(projDoc, {
          ...currentProject,
          features,
          techStack,
          imageUrl,
        });
        showToast("Project updated successfully!", "success");
      } else {
        await addDoc(projectsCollectionRef, {
          ...currentProject,
          features,
          techStack,
          imageUrl,
          createdAt: new Date(),
        });
        showToast("Project added successfully!", "success");
      }
      fetchProjects();
      handleClose();
    } catch (error: any) {
      showToast(error.message || "Error saving project.", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteTargetId(id);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteDoc(doc(db, "projects", deleteTargetId));
      showToast("Project deleted.", "success");
      fetchProjects();
    } catch {
      showToast("Error deleting project.", "error");
    } finally {
      setShowConfirmModal(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className={adminStyles.pageHeader}>
        <div>
          <h3 className={adminStyles.pageTitle}>Manage Projects</h3>
          <p className={adminStyles.pageMeta}>
            Curate portfolio projects, links, features, and cover images.
          </p>
        </div>
        <button className={adminStyles.primaryButton} onClick={() => handleShow()}>
          <FaPlus /> Add Project
        </button>
      </div>

      <Card className={adminStyles.panel}>
        <Card.Body>
          {isFetching ? (
            <div className={adminStyles.loadingState}>
              <Spinner animation="border" variant="primary" />
              <p>Loading projects...</p>
            </div>
          ) : (
            <Table responsive hover className={adminStyles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={3} className={adminStyles.emptyState}>
                      No projects found. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  projects.map((proj) => (
                    <tr key={proj.id}>
                      <td className="w-25">{proj.title}</td>
                      <td
                        className="text-truncate"
                        style={{ maxWidth: "250px" }}
                      >
                        {proj.description}
                      </td>
                      <td>
                        <div className={adminStyles.actionGroup}>
                        <button
                          className={adminStyles.iconButton}
                          onClick={() => handleShow(proj)}
                          aria-label={`Edit ${proj.title}`}
                        >
                          <FaPen />
                        </button>
                        <button
                          className={`${adminStyles.iconButton} ${adminStyles.deleteIconButton}`}
                          onClick={() => confirmDelete(proj.id)}
                          aria-label={`Delete ${proj.title}`}
                        >
                          <FaTrash />
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        contentClassName={adminStyles.modalContent}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Project" : "Add New Project"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className={adminStyles.modalBody}>
            <Form.Group className="mb-3">
              <Form.Label>
                Project Title <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={100}
                value={currentProject.title || ""}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    title: e.target.value,
                  })
                }
                className={adminStyles.formControl}
                placeholder="My Awesome Project"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Short Description <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                maxLength={MAX_DESC_LENGTH}
                value={currentProject.description || ""}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    description: e.target.value,
                  })
                }
                className={adminStyles.formControl}
              />
              <Form.Text
                className={`${(currentProject.description || "").length >= MAX_DESC_LENGTH ? "text-danger" : "text-muted"}`}
              >
                {(currentProject.description || "").length}/{MAX_DESC_LENGTH}{" "}
                characters
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Tech Stack <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={techStackStr}
                onChange={(e) => setTechStackStr(e.target.value)}
                placeholder="React, TypeScript, Firebase (comma-separated)"
                className={adminStyles.formControl}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Features <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                required
                value={featuresStr}
                onChange={(e) => setFeaturesStr(e.target.value)}
                placeholder="One feature per line"
                className={adminStyles.formControl}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                GitHub URL <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="url"
                required
                value={currentProject.githubLink || ""}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    githubLink: e.target.value,
                  })
                }
                className={adminStyles.formControl}
                placeholder="https://github.com/..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Live Demo URL <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="url"
                required
                value={currentProject.liveLink || ""}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    liveLink: e.target.value,
                  })
                }
                className={adminStyles.formControl}
                placeholder="https://..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Cover Image URL <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="url"
                required
                value={currentProject.imageUrl || ""}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    imageUrl: e.target.value,
                  })
                }
                className={adminStyles.formControl}
                placeholder="https://example.com/image.png"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className={adminStyles.secondaryButton}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className={adminStyles.primaryButton}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Saving...
                </>
              ) : (
                "Save Project"
              )}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        contentClassName={adminStyles.modalContent}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className={adminStyles.secondaryButton}
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={adminStyles.dangerButton}
            onClick={handleDelete}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminProjects;
