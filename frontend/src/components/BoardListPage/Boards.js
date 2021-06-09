import React, { Component, Fragment } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getBoardsList, getBoardsOrder, deleteBoard } from '../../actions';
import BoardThumbnail from "./BoardThumnail";
import Icon from "@material-ui/core/Icon";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const DeleteButton = styled(Icon)`
  cursor: pointer; 
  transition: opacity 0.3s ease-in-out;
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
  color: black;
  font-size: 5rem;
`;

export class Boards extends Component{

    static propTypes = {
      getBoardsList: PropTypes.func.isRequired,
      getBoardsOrder: PropTypes.func.isRequired,
    };
  
    constructor(props){
        super(props);
        this.state = {
            boardsList: props.boardsList,
            boardsOrder: props.boardsOrder,
        };
    }
  
    async componentDidMount(){ 
        console.log("componentDidMount")
        try
        {
          await this.props.getBoardsList();
          await this.props.getBoardsOrder();
        }
        catch(err)
        {
          console.error(err);
        }
        console.log("componentDidMountEnd");
    }

    async handleDeleteBoard(boardid){
      await this.props.deleteBoard(boardid);
    };

    render() {
      return (
        <Fragment>
            <HomeContainer>
                <Thumbnails>
                    {this.props.boardsOrder.map(boardID => {
                        const board = this.props.boardsList[boardID];
                        return (
                            <div>
                              <Link
                              key={boardID}
                              to={`/board/${board.id}`}
                              style={{ textDecoration: "none" }}
                              >
                                  <BoardThumbnail {...board} />
                              </Link>
                              <DeleteButton onClick={this.handleDeleteBoard.bind(this, board.id)}>
                                delete
                              </DeleteButton>
                            </div>
                        );
                    })}
                </Thumbnails>
            </HomeContainer>
        </Fragment>
      )
    }
  }

  const mapStateToProps = state => ({
    boardsList: state.boardsList.boardsList,
    boardsOrder: state.boardsOrder.boardsOrder
  });
  
  const mapDispatchToProps = dispatch => ({
    getBoardsList: () => dispatch(getBoardsList()),
    getBoardsOrder: () => dispatch(getBoardsOrder()),
    deleteBoard: (boardid) => dispatch(deleteBoard(boardid)),
  });
    
  export default connect(mapStateToProps, mapDispatchToProps)(Boards);