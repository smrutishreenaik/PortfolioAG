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
import { Experience } from "../../types";
import useToast from "../../hooks/useToast";
import ToastContainer from "../../components/ToastContainer";
import { sortByDisplayOrder } from "../../utils/firestoreOrdering";
import adminStyles from "./Admin.module.scss";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";

const AdminExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [currentExp, setCurrentExp] = useState<Partial<Experience>>({});
  const [achievementsStr, setAchievementsStr] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toasts, showToast, dismissToast } = useToast();

  const expCollectionRef = collection(db, "experience");
  const getNextOrder = () =>
    experiences.reduce((maxOrder, experience) => {
      const orderValue =
        typeof experience.order === "number" ? experience.order : 0;
      return Math.max(maxOrder, orderValue);
    }, 0) + 1;

  const fetchExperience = async () => {
    try {
      const data = await getDocs(expCollectionRef);
      const results = data.docs.map(
        (document) => ({ ...document.data(), id: document.id }) as Experience,
      );
      setExperiences(sortByDisplayOrder(results));
    } catch {
      showToast("Failed to load experience entries.", "error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchExperience();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setCurrentExp({});
    setAchievementsStr("");
    setIsEditing(false);
  };

  const handleShow = (experience?: Experience) => {
    if (experience) {
      setCurrentExp(experience);
      setAchievementsStr(experience.achievements.join("\n"));
      setIsEditing(true);
    } else {
      setCurrentExp({ order: getNextOrder() });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const achievements = achievementsStr
      .split("\n")
      .filter((achievement) => achievement.trim() !== "");

    try {
      const logoUrl = currentExp.logoUrl || "";
      const order =
        typeof currentExp.order === "number" && Number.isFinite(currentExp.order)
          ? currentExp.order
          : getNextOrder();
      const payload = {
        ...currentExp,
        achievements,
        logoUrl,
        order,
      };

      if (isEditing && currentExp.id) {
        const expDoc = doc(db, "experience", currentExp.id);
        await updateDoc(expDoc, payload);
        showToast("Experience updated successfully!", "success");
      } else {
        await addDoc(expCollectionRef, {
          ...payload,
          createdAt: new Date(),
        });
        showToast("Experience added successfully!", "success");
      }
      fetchExperience();
      handleClose();
    } catch {
      showToast("Error saving experience. Check Firestore rules.", "error");
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
      await deleteDoc(doc(db, "experience", deleteTargetId));
      showToast("Experience entry deleted.", "success");
      fetchExperience();
    } catch {
      showToast("Error deleting experience entry.", "error");
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
          <h3 className={adminStyles.pageTitle}>Manage Experience</h3>
          <p className={adminStyles.pageMeta}>
            Order career entries and keep achievements ready for display.
          </p>
        </div>
        <button className={adminStyles.primaryButton} onClick={() => handleShow()}>
          <FaPlus /> Add Experience
        </button>
      </div>

      <Card className={adminStyles.panel}>
        <Card.Body>
          {isFetching ? (
            <div className={adminStyles.loadingState}>
              <Spinner animation="border" variant="primary" />
              <p>Loading experience...</p>
            </div>
          ) : (
            <Table responsive hover className={adminStyles.table}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Time Period</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={adminStyles.emptyState}>
                      No experience entries found. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  experiences.map((experience) => (
                    <tr key={experience.id}>
                      <td>{experience.order ?? "-"}</td>
                      <td>{experience.companyName}</td>
                      <td>{experience.role}</td>
                      <td>{experience.timePeriod}</td>
                      <td>
                        <div className={adminStyles.actionGroup}>
                        <button
                          className={adminStyles.iconButton}
                          onClick={() => handleShow(experience)}
                          aria-label={`Edit ${experience.companyName}`}
                        >
                          <FaPen />
                        </button>
                        <button
                          className={`${adminStyles.iconButton} ${adminStyles.deleteIconButton}`}
                          onClick={() => confirmDelete(experience.id)}
                          aria-label={`Delete ${experience.companyName}`}
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
        contentClassName={adminStyles.modalContent}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Experience" : "Add New Experience"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className={adminStyles.modalBody}>
            <Form.Group className="mb-3">
              <Form.Label>
                Display Order <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                required
                min={1}
                value={currentExp.order ?? ""}
                onChange={(e) =>
                  setCurrentExp({
                    ...currentExp,
                    order: Number(e.target.value),
                  })
                }
                className={adminStyles.formControl}
                placeholder="1"
              />
              <Form.Text className="text-muted">
                Lower numbers appear first on both the admin and main pages.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Company Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={100}
                value={currentExp.companyName || ""}
                onChange={(e) =>
                  setCurrentExp({ ...currentExp, companyName: e.target.value })
                }
                className={adminStyles.formControl}
                placeholder="e.g. Google"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Role / Title <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={100}
                value={currentExp.role || ""}
                onChange={(e) =>
                  setCurrentExp({ ...currentExp, role: e.target.value })
                }
                className={adminStyles.formControl}
                placeholder="e.g. Senior Frontend Engineer"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Time Period <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={currentExp.timePeriod || ""}
                onChange={(e) =>
                  setCurrentExp({ ...currentExp, timePeriod: e.target.value })
                }
                className={adminStyles.formControl}
                placeholder="e.g. Jan 2022 – Present"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Company Website <span className="text-muted">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="url"
                value={currentExp.companyWebsite || ""}
                onChange={(e) =>
                  setCurrentExp({
                    ...currentExp,
                    companyWebsite: e.target.value,
                  })
                }
                className={adminStyles.formControl}
                placeholder="https://..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Logo Image URL <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="url"
                required
                value={currentExp.logoUrl || ""}
                onChange={(e) =>
                  setCurrentExp({
                    ...currentExp,
                    logoUrl: e.target.value,
                  })
                }
                className={adminStyles.formControl}
                placeholder="https://example.com/logo.png"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Achievements <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                required
                value={achievementsStr}
                onChange={(e) => setAchievementsStr(e.target.value)}
                className={adminStyles.formControl}
                placeholder="One achievement per line"
              />
              <Form.Text className="text-muted">
                Enter each achievement on a new line.
              </Form.Text>
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
                "Save Experience"
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
          Are you sure you want to delete this experience entry? This action
          cannot be undone.
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

export default AdminExperience;
