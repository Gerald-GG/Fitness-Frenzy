import { useState, useEffect } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

function CommentSection() { 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);

  // Load comments from the server
  useEffect(() => {
    fetch('http://localhost:3000/comments')
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, []);

  const handleAddComment = () => {
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]);
        setNewComment('');
      });
  };

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleSaveComment = (commentId, updatedText) => {
    fetch(`http://localhost:3000/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: updatedText }),
    }).then(() => {
      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? { ...comment, text: updatedText } : comment
      );
      setComments(updatedComments);
      setEditingCommentId(null);
    });
  };

  const handleDeleteComment = (commentId) => {
    fetch(`http://localhost:3000/comments/${commentId}`, {
      method: 'DELETE',
    }).then(() => {
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);
    });
  };

  return (
    <div className='container' style={{ width: '50%' }}>
        <br></br>
      <h1 className="text-primary">REVIEW SECTION</h1>
      <Form>
        <Form.Group controlId="newComment">
          <Form.Control
            type="text"
            placeholder="Add a new comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Button variant="primary" onClick={handleAddComment}>
          Add comment here 
        </Button>
      </Form>
      <br></br><br></br>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id} style={{ marginBottom: '10px' }}>
            {editingCommentId === comment.id ? (
              <div>
                <input
                  type="text"
                  value={comment.text}
                  onChange={(e) => handleSaveComment(comment.id, e.target.value)}
                />
                <Button variant="warning" className="ms-2" onClick={() => handleSaveComment(comment.id, comment.text)}>
                  Save
                </Button>
              </div>
            ) : (
              <div>
                {comment.text}
                <Button variant="info" className="ms-2" onClick={() => handleEditComment(comment.id)}>
                  Edit
                </Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </Button>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default CommentSection; 