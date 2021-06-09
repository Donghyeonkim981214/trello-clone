import React from "react";
import Icon from "@material-ui/core/Icon";
import TrelloButton from "./TrelloButton";
import { connect } from "react-redux";
import { addList, addCard } from "../../actions";
import styled from "styled-components";
import TrelloForm from "./TrelloForm";
import TrelloOpenForm from "./TrelloOpenForm";

class TrelloCreate extends React.PureComponent {
  
  constructor(props){
    super(props);
    this.state = {
      formOpen: false,
      text: ""
    };
  }

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };

  handleInputChange = e => {
    console.log(this.props);
    this.setState({
      text: e.target.value
    });
  };

  handleAddList = () => {
    const { boardId } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      this.props.addList(text, boardId);
    }
  };

  handleAddCard = () => {
    const { listID, boardID } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      this.props.addCard(listID, text, boardID);
    }
  };

  renderOpenForm = () => {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

    const OpenFormButton = styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 3px;
      height: 36px;
      margin-left: 8px;
      width: 300px;
      padding-left: 10px;
      padding-right: 10px;
      opacity: ${buttonTextOpacity};
      color: ${buttonTextColor};
      background-color: ${buttonTextBackground};
    `;

    return (
      <OpenFormButton onClick={this.openForm}>
        <Icon>add</Icon>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </OpenFormButton>
    );
  };

  render() {
    const { text } = this.state;
    const { list } = this.props;
    return this.state.formOpen ? (
      <div stlye={{"width": "300px"}}>
      <TrelloForm
        list={list}
        text={text}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
      >
        <TrelloButton onClick={list ? this.handleAddList : this.handleAddCard}>
          {list ? "Add List" : "Add Card"}
        </TrelloButton>
      </TrelloForm>
      </div>
    ) : (
      <div stlye={{"width": "300px"}}>
      <TrelloOpenForm list={list} onClick={this.openForm}>
        {list ? "Add another list" : "Add another card"}
      </TrelloOpenForm>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addList: (text, boardId) => dispatch(addList(text, boardId)),
  addCard: (listID, text, boardID) => dispatch(addCard(listID, text, boardID)),
});
  

export default connect(null, mapDispatchToProps)(TrelloCreate);
