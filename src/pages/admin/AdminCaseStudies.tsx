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
import { CaseStudy } from "../../types";
import useToast from "../../hooks/useToast";
import ToastContainer from "../../components/ToastContainer";

const AdminCaseStudies: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [currentStudy, setCurrentStudy] = useState<Partial<CaseStudy>>({});

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toasts, showToast, dismissToast } = useToast();

  const csCollectionRef = collection(db, "caseStudies");

  const fetchCaseStudies = async () => {
    try {
      const data = await getDocs(csCollectionRef);
      setCaseStudies(
        data.docs.map(
          (document) => ({ ...document.data(), id: document.id }) as CaseStudy,
        ),
      );
    } catch {
      showToast("Failed to load case studies.", "error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setCurrentStudy({});
    setIsEditing(false);
  };

  const handleShow = (study?: CaseStudy) => {
    if (study) {
      setCurrentStudy(study);
      setIsEditing(true);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrl = currentStudy.imageUrl || "";

      if (isEditing && currentStudy.id) {
        const csDoc = doc(db, "caseStudies", currentStudy.id);
        await updateDoc(csDoc, { ...currentStudy, imageUrl });
        showToast("Case study updated successfully!", "success");
      } else {
        await addDoc(csCollectionRef, {
          ...currentStudy,
          imageUrl,
          createdAt: new Date(),
        });
        showToast("Case study added successfully!", "success");
      }
      fetchCaseStudies();
      handleClose();
    } catch (error: any) {
      showToast(error.message || "Error saving case study.", "error");
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
      await deleteDoc(doc(db, "caseStudies", deleteTargetId));
      showToast("Case study deleted.", "success");
      fetchCaseStudies();
    } catch {
      showToast("Error deleting case study.", "error");
    } finally {
      setShowConfirmModal(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white mb-0">Manage Case Studies</h3>
        <button className="btn btn-primary" onClick={() => handleShow()}>
          + Add Case Study
        </button>
      </div>

      <Card className="bg-dark text-white border-secondary">
        <Card.Body>
          {isFetching ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading case studies...</p>
            </div>
          ) : (
            <Table responsive variant="dark" hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {caseStudies.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center py-4 text-muted">
                      No case studies found. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  caseStudies.map((study) => (
                    <tr key={study.id}>
                      <td>{study.title}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-outline-info btn-sm me-2"
                          onClick={() => handleShow(study)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => confirmDelete(study.id)}
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
        size="lg"
        contentClassName="bg-dark text-white"
      >
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title>
            {isEditing ? "Edit Case Study" : "Add New Case Study"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Form.Group className="mb-3">
              <Form.Label>
                Title <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={120}
                value={currentStudy.title || ""}
                onChange={(e) =>
                  setCurrentStudy({ ...currentStudy, title: e.target.value })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="e.g. Redesigning the Checkout Flow"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cover Image URL</Form.Label>
              <Form.Control
                type="url"
                value={currentStudy.imageUrl || ""}
                onChange={(e) =>
                  setCurrentStudy({ ...currentStudy, imageUrl: e.target.value })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="https://example.com/cover-image.jpg"
              />
              <Form.Text className="text-muted">
                Paste a direct URL to your cover image.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Content (HTML supported) <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={12}
                required
                value={currentStudy.content || ""}
                onChange={(e) =>
                  setCurrentStudy({ ...currentStudy, content: e.target.value })
                }
                className="bg-transparent text-white border-secondary font-monospace"
                placeholder="<h2>Overview</h2><p>Describe your case study here...</p>"
              />
              <Form.Text className="text-muted mt-1 d-block">
                Use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;,
                &lt;li&gt;, &lt;strong&gt; to format the content.
              </Form.Text>
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
                "Save Case Study"
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
          Are you sure you want to delete this case study? This action cannot be
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

export default AdminCaseStudies;
