import React, { Component } from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBoard } from '../../actions';

const CreateTitle = styled.h3`
  font-size: 48px;
  color: white;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  width: 400px;
  height: 80px;
  font-size: 22px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  outline-color: blue;
  box-shadow: 0 2px 4px grey;
  align-self: center;
`;


export class BoardForm extends Component{

    static propTypes = {
      addBoard: PropTypes.func.isRequired,
    };
  
    constructor(props){
      super(props);
      this.state = {
        setNewBoardTitle: "",
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(e){
      var value = e.target.value
  
      this.setState({
          setNewBoardTitle: value
      })
    };
  
    async handleSubmit(e){
      e.preventDefault();
  
      await this.props.addBoard(this.state.setNewBoardTitle);

      this.setState({
        setNewBoardTitle: "",
      });
    };
  
    render() {
      return (
          <form onSubmit={this.handleSubmit} value={this.state.newBoardTitle} style={{ textAlign: "center" }}>
            <CreateTitle>Create a new Board</CreateTitle>
            <CreateInput
              onChange={this.handleChange}
              placeholder="Your boards title..."
              type="text"
              value={this.state.setNewBoardTitle}
            />
          </form>
      )
    }
  }

// mapStateToProps 는 리덕스 스토어의 상태를 조회해서 어떤 것들을 props 로 넣어줄지 정의합니다.
// 현재 리덕스 상태를 파라미터로 받아옵니다.

const mapDispatchToProps = dispatch => ({
  addBoard: (title) => dispatch(addBoard(title)),
});
  
export default connect(null, mapDispatchToProps)(BoardForm);
  