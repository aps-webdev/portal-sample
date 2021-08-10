import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectHeight } from '../redux/auth/auth.selector';

const Helper = ({ height }) => {
  return ReactDOM.createPortal(
    <div
      style={{
        background: '#EDF6FF',
        height: Math.max(height, window.innerHeight),
      }}
    ></div>,
    document.getElementById('root-body')
  );
};

const mapStateToProps = createStructuredSelector({
  height: selectHeight,
});

export default connect(mapStateToProps, null)(Helper);
