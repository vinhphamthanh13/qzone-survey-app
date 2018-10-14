import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'perfect-scrollbar';

class SidebarWrapper extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.node).isRequired,
  }

  static defaultProps = {
    className: undefined,
  }

  ps = null;

  constructor(props) {
    super(props);
    this.sidebarWrapperRef = React.createRef();
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      this.ps = new PerfectScrollbar(this.sidebarWrapperRef, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      this.ps.destroy();
    }
  }

  render() {
    const { className, links } = this.props;
    return (
      <div className={className} ref={this.sidebarWrapperRef}>
        {links}
      </div>
    );
  }
}

export default SidebarWrapper;
