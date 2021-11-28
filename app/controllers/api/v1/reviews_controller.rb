module Api 
    module  V1 
        class ReviewsController < ApplicationController
            protect_from_forgery with: :null_session
            
            def create 
                review = Review.new(review_params)

                if review.save 
                    render json: serializer(review)
                else 
                    render json: { error: review.errors.messages }, status: 422
                end
            end

            def destroy 
                review = Review.find(params[:id])

                if review.destroy 
                    head :no_content 
                else 
                    render json: { error: review.errors.messages }, status: 422
                end
            end
            
            private

            def review_params
                params.require(:review).permit(:title, :description, :score, :airline_id)
            end

            # fast_jsonapi serializer 
            def serializer(records, options = {})
                ReviewSerializer
                  .new(records, options)
                  .serialized_json
            end
        
            def errors(record)
                { errors: record.errors.messages }
            end
        end
    end
end