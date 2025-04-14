import React from 'react';
import { Star } from 'lucide-react';
import './ReviewCard.css';

const ReviewCard = ({ title, content, author, role, date }) => {
  return (
    <div className="review-card">
      <div className="star-rating">
        {[...Array(4)].map((_, i) => (
          <Star key={i} className="star-icon" />
        ))}
      </div>
      <h3 className="review-card-title">{title}</h3>
      <p className="review-card-content">"{content}"</p>
      <div className="review-card-footer">
        <div className="review-card-author">
          <p className="author-name">{author}</p>
          <p className="author-role">{role}</p>
        </div>
        {date && <span className="review-card-date">{date}</span>}
      </div>
    </div>
  );
};

export default ReviewCard;
