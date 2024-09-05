import React from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { Review } from '../../types';

interface ReviewListProps {
  restaurantId: string;
  reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        No reviews yet. Be the first to review!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center mb-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${review.userName}&background=random`}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-medium">{review.userName}</h4>
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-700 mb-4">{review.comment}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <button className="flex items-center space-x-1 hover:text-gray-700">
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-gray-700">
              <Flag className="h-4 w-4" />
              <span>Report</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};