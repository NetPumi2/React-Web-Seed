// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './header.css';
import { headerUp, headerDown } from '../../redux/reducers/header/actions';
import { getCount } from '../../redux/reducers/header/reducer';

type Props = {
  countValue: number,
  headerUp: void,
  headerDown: void,
};

class Header extends Component<Props> {
  props: Props;

  render() {
    const { countValue, headerDown, headerUp } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <div>
            <a href="#" name="whatever" role="button" onClick={headerUp}>Click UP</a><br />
            <a href="#" role="button" onClick={headerDown}>Click DOWN</a><br />
            VALUE: {countValue}
          </div>
          <h2>Welcome to React</h2>
          <Link to="/koko">
            Link to /koko
          </Link>
          <br />
          <Link to="/">
            Link to /
          </Link>
          <br />
          <Link to="/index">
            Link to /index
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //reducers
  const { rootReducer } = state;
  const { header } = rootReducer;
  const countValue = getCount(header);

  return {
    countValue,
  };
};

export default connect(
  mapStateToProps,
  {
    //actions
    headerUp,
    headerDown,
  },
)(Header);
