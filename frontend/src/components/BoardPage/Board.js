import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TrelloList from "./TrelloList";
import TrelloCreate from "./TrelloCreate";
import styled from "styled-components";
import { getBoard,
  getLists,
  getListsOrder,
  getCards,
  sort,
  reorderLists,
  sortCards,
  sortCardsAnotherList } from "../../actions";
import PropTypes from 'prop-types';


const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class TrelloBoard extends PureComponent {

  static propTypes = {
    getBoard: PropTypes.func.isRequired,
    getLists: PropTypes.func.isRequired,
    getListsOrder: PropTypes.func.isRequired,
    getCards: PropTypes.func.isRequired,
    sort: PropTypes.func.isRequired,
    reorderLists: PropTypes.func.isRequired,
    sortCards: PropTypes.func.isRequired,
    sortCardsAnotherList: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props);
    this.state = {
        lists: props.lists,
        listsOrder: props.listsOrder,
        cards: props.cards,
    };
  }

  async componentDidMount() {
    const { boardID } = this.props.match.params;

    console.log("componentDidMount")
        try
        {
          await this.props.getBoard(boardID);
          await this.props.getLists(boardID);
          await this.props.getListsOrder(boardID);
          await this.props.getCards(boardID);
        }
        catch(err)
        {
          console.error(err);
        }
    console.log("componentDidMountEnd");
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    //순서와는 상과없는 곳으로 드래그했을 경우
    if (!destination) {
      return;
    }

    //제자리일 경우
    if(source.index === destination.index && source.droppableId === destination.droppableId){
      return;
    }

    this.props.sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
    );

    //리스트의 순서가 변경된 경우
    if(type === "list"){
    //순서가 변경된 리스트의 범위
    //우->좌
      if (source.index > destination.index){
        var reorderedLists = this.props.listsOrder.slice(destination.index, source.index + 1);
        var startIndex = destination.index + 1
      }
      //좌->우
      else{
        var reorderedLists = this.props.listsOrder.slice(source.index, destination.index + 1);
        var startIndex = source.index + 1
      }

      this.props.reorderLists(reorderedLists, startIndex)
    }
    //같은 리스트내에서 카드의 순서가 변경되는 경우
    else if(source.droppableId === destination.droppableId){
      var listId = source["droppableId"]
      if (source.index > destination.index){
        var sortedCards = this.props.lists[listId].cards.slice(destination.index, source.index + 1);
        var startIndex = destination.index + 1
      }
      else{
        var sortedCards = this.props.lists[listId].cards.slice(source.index, destination.index + 1);
        var startIndex = source.index + 1
      }

      this.props.sortCards(sortedCards, startIndex)
    }
    //move a card to another list
    else{
      this.props.sortCardsAnotherList(
        source.droppableId,//start listID
        destination.droppableId,//end listID
        source.index,//start card index
        destination.index,//end card index
        draggableId//moved card
        )
    };
  };

  render() {
    const board = this.props.board;
    if (!board) {
      return <p>Board not found</p>;
    }
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Link to="/">Go Back</Link>
        <h2>{board.title}</h2>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.props.listsOrder.map((listId, index) => {
                const list = this.props.lists[listId];
                if (list) {
                  const listCards = list.cards;
                  return (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                      cardsList={this.props.cards}
                      boardID={this.props.board['id']}
                    />
                  );
                }
              })}
              {provided.placeholder}
              <TrelloCreate list boardId={this.props.board['id']} />
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  board: state.board.board,
  lists: state.lists.lists,
  listsOrder: state.listsOrder.listsOrder,
  cards: state.cards.cards
});

const mapDispatchToProps = dispatch => ({
  getBoard: (boardID) => dispatch(getBoard(boardID)),
  getLists: (boardID) => dispatch(getLists(boardID)),
  getListsOrder: (boardID) => dispatch(getListsOrder(boardID)),
  getCards: (boardID) => dispatch(getCards(boardID)),
  reorderLists: (reorderedLists, startIndex) => dispatch(reorderLists(reorderedLists, startIndex)),
  sort: (source_droppableId,
    destination_droppableId,
    source_index,
    destination_index,
    draggableId,
    type) => dispatch(sort(source_droppableId,
      destination_droppableId,
      source_index,
      destination_index,
      draggableId,
      type)),
  sortCards: (sortedCards, startIndex) => dispatch(sortCards(sortedCards, startIndex)),
  sortCardsAnotherList: (source_droppableId,
    destination_droppableId,
    source_index,
    destination_index,
    draggableId) => dispatch(sortCardsAnotherList(source_droppableId,
      destination_droppableId,
      source_index,
      destination_index,
      draggableId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrelloBoard);
