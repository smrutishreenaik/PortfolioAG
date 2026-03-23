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
import { Testimonial } from "../../types";
import useToast from "../../context/useToast";
import ToastContainer from "../../components/ToastContainer";

const MAX_QUOTE_LENGTH = 600;

const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState<
    Partial<Testimonial>
  >({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toasts, showToast, dismissToast } = useToast();

  const testimonialsCollectionRef = collection(db, "testimonials");

  const fetchTestimonials = async () => {
    try {
      const data = await getDocs(testimonialsCollectionRef);
      setTestimonials(
        data.docs.map(
          (document) =>
            ({ ...document.data(), id: document.id }) as Testimonial,
        ),
      );
    } catch {
      showToast("Failed to load testimonials.", "error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setCurrentTestimonial({});
    setIsEditing(false);
  };

  const handleShow = (testimonial?: Testimonial) => {
    if (testimonial) {
      setCurrentTestimonial(testimonial);
      setIsEditing(true);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && currentTestimonial.id) {
        const testimonialDoc = doc(db, "testimonials", currentTestimonial.id);
        await updateDoc(testimonialDoc, { ...currentTestimonial });
        showToast("Testimonial updated successfully!", "success");
      } else {
        await addDoc(testimonialsCollectionRef, {
          ...currentTestimonial,
          createdAt: new Date(),
        });
        showToast("Testimonial added successfully!", "success");
      }
      fetchTestimonials();
      handleClose();
    } catch {
      showToast("Error saving testimonial. Check Firestore rules.", "error");
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
      await deleteDoc(doc(db, "testimonials", deleteTargetId));
      showToast("Testimonial deleted.", "success");
      fetchTestimonials();
    } catch {
      showToast("Error deleting testimonial.", "error");
    } finally {
      setShowConfirmModal(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white mb-0">Manage Testimonials</h3>
        <button className="btn btn-primary" onClick={() => handleShow()}>
          + Add Testimonial
        </button>
      </div>

      <Card className="bg-dark text-white border-secondary">
        <Card.Body>
          {isFetching ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading testimonials...</p>
            </div>
          ) : (
            <Table responsive variant="dark" hover>
              <thead>
                <tr>
                  <th>Person</th>
                  <th>Company</th>
                  <th>Position</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-muted">
                      No testimonials found. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  testimonials.map((testimonial) => (
                    <tr key={testimonial.id}>
                      <td>{testimonial.personName}</td>
                      <td>{testimonial.company}</td>
                      <td>{testimonial.position}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-outline-info btn-sm me-2"
                          onClick={() => handleShow(testimonial)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => confirmDelete(testimonial.id)}
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
            {isEditing ? "Edit Testimonial" : "Add New Testimonial"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Form.Group className="mb-3">
              <Form.Label>
                Person Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={80}
                value={currentTestimonial.personName || ""}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    personName: e.target.value,
                  })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="e.g. Jane Doe"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Position <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={100}
                value={currentTestimonial.position || ""}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    position: e.target.value,
                  })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="e.g. Engineering Manager"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Company <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={100}
                value={currentTestimonial.company || ""}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    company: e.target.value,
                  })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="e.g. Acme Corp"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                LinkedIn URL <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="url"
                required
                value={currentTestimonial.linkedinUrl || ""}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    linkedinUrl: e.target.value,
                  })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="https://linkedin.com/in/..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Profile Picture URL{" "}
                <span className="text-muted">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="url"
                value={currentTestimonial.profilePicUrl || ""}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    profilePicUrl: e.target.value,
                  })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="https://..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Quote / Recommendation <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                required
                maxLength={MAX_QUOTE_LENGTH}
                value={currentTestimonial.quote || ""}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    quote: e.target.value,
                  })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="Their recommendation or testimonial quote..."
              />
              <Form.Text
                className={`${(currentTestimonial.quote || "").length >= MAX_QUOTE_LENGTH ? "text-danger" : "text-muted"}`}
              >
                {(currentTestimonial.quote || "").length}/{MAX_QUOTE_LENGTH}{" "}
                characters
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
                "Save Testimonial"
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
          Are you sure you want to delete this testimonial? This action cannot
          be undone.
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

export default AdminTestimonials;
