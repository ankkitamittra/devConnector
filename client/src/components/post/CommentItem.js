import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeComment } from '../../actions/post';

const CommentItem = ({ 
    comment : { _id, text, name, avatar, user, date},
    postId,
    auth,
    removeComment 
}) => {
    return (
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                Posted on<Moment format="YYYY/MM/DD">{date}</Moment> 
            </p>
            { !auth.loading && user === auth.user._id &&
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={ e=> removeComment(postId, _id)}
                >
                    <i className="fas fa-times"></i>
                </button>
            }
          </div>
          </div>
    )
}

CommentItem.propTypes = {
    removeComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, { removeComment })(CommentItem);
