import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGitHub = ({username, repos, getGithubRepos}) => {

    useEffect(() => {
       getGithubRepos(username)
    }, [getGithubRepos, username]);

    return (
        <div class="profile-github">
            <h2 class="text-primary my-1">
                <i class="fab fa-github"></i> Github Repos
            </h2>
            {repos && repos.length > 0 && repos.map((repo, index) => (
                <div class="repo bg-white p-1 my-1" key={repo._id}>
                  <h4><a href={repo.html._url} target="_blank"
                         rel="noopener noreferrer">{repo.name}</a></h4>
                </div>
            )) }
           
          </div>
    )
}

ProfileGitHub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
});

export default connect(mapStateToProps, {getGithubRepos})(ProfileGitHub);
