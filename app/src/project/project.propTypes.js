import { PropTypes } from 'react'

const ProjectPropTypes = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    estimate: PropTypes.number.isRequired,
    acquired: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
})

export default ProjectPropTypes