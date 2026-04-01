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
import { Skill } from "../../types";
import useToast from "../../hooks/useToast";
import ToastContainer from "../../components/ToastContainer";

const AdminSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toasts, showToast, dismissToast } = useToast();

  const skillsCollectionRef = collection(db, "skills");

  const fetchSkills = async () => {
    try {
      const data = await getDocs(skillsCollectionRef);
      setSkills(
        data.docs.map(
          (document) => ({ ...document.data(), id: document.id }) as Skill,
        ),
      );
    } catch {
      showToast("Failed to load skills.", "error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setCurrentSkill({});
    setIsEditing(false);
  };

  const handleShow = (skill?: Skill) => {
    if (skill) {
      setCurrentSkill(skill);
      setIsEditing(true);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && currentSkill.id) {
        const skillDoc = doc(db, "skills", currentSkill.id);
        await updateDoc(skillDoc, {
          name: currentSkill.name,
          type: currentSkill.type,
        });
        showToast("Skill updated successfully!", "success");
      } else {
        await addDoc(skillsCollectionRef, {
          name: currentSkill.name,
          type: currentSkill.type || "frontend",
          createdAt: new Date(),
        });
        showToast("Skill added successfully!", "success");
      }
      fetchSkills();
      handleClose();
    } catch {
      showToast("Error saving skill. Check Firestore rules.", "error");
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
      await deleteDoc(doc(db, "skills", deleteTargetId));
      showToast("Skill deleted.", "success");
      fetchSkills();
    } catch {
      showToast("Error deleting skill.", "error");
    } finally {
      setShowConfirmModal(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white mb-0">Manage Skills</h3>
        <button className="btn btn-primary" onClick={() => handleShow()}>
          + Add Skill
        </button>
      </div>

      <Card className="bg-dark text-white border-secondary">
        <Card.Body>
          {isFetching ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading skills...</p>
            </div>
          ) : (
            <Table responsive variant="dark" hover>
              <thead>
                <tr>
                  <th>Skill Name</th>
                  <th>Category</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-muted">
                      No skills found. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  skills.map((skill) => (
                    <tr key={skill.id}>
                      <td>{skill.name}</td>
                      <td className="text-capitalize">{skill.type}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-outline-info btn-sm me-2"
                          onClick={() => handleShow(skill)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => confirmDelete(skill.id)}
                        >
                          Delete
                        </button>
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
        contentClassName="bg-dark text-white"
      >
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title>
            {isEditing ? "Edit Skill" : "Add New Skill"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>
                Skill Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={60}
                value={currentSkill.name || ""}
                onChange={(e) =>
                  setCurrentSkill({ ...currentSkill, name: e.target.value })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="e.g. React, TypeScript"
              />
              <Form.Text className="text-muted">
                {(currentSkill.name || "").length}/60 characters
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Category <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={currentSkill.type || "frontend"}
                onChange={(e) =>
                  setCurrentSkill({
                    ...currentSkill,
                    type: e.target.value as Skill["type"],
                  })
                }
                className="bg-dark text-white border-secondary"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="tools">Tools & DevOps</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-secondary">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Saving...
                </>
              ) : (
                "Save Skill"
              )}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        contentClassName="bg-dark text-white"
        centered
      >
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this skill? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminSkills;
