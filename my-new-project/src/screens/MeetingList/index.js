import React, { Component } from "react";
import MeetingList from "../../components/MeetingList";
import QuickAdd from "../../components/QuickAdd";
import SearchBar from "../../components/SearchBar/index";
import styled from "styled-components";
import EasterEgg from "../../components/EasterEgg";
import { connect } from "react-redux";

//this screen should return components necessary to build the convo list page.
const ConvoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`;
const FlexBox = styled.div`
  display: flex;
  width: 100%;
  background: #f0f0f0;
  border: 1px solid lightgrey;
  @media (max-width: 500px) {
    flex-direction: column;
    padding-top: 1rem;
  }
`;

class ScreensMeetingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredMeetings: [],
      search: ""
    };
    this.filtered = this.filtered.bind(this);
  }

  filtered(meetings, search) {
    this.setState({ filteredMeetings: meetings, search: search });
  }

  render() {
    if (this.state.search !== "") {
      var filtered_meetings = (
        <MeetingList
          token={this.props.match.params.token}
          filteredMeetings={this.state.filteredMeetings}
          search={this.state.search}
        />
      );
    } else {
      filtered_meetings = (
        <MeetingList
          token={this.props.match.params.token}
          filteredMeetings={this.props.meetings}
          search={this.state.search}
        />
      );
    }

    return (
      <ConvoGrid>
        <EasterEgg />
        <FlexBox>
          <QuickAdd />
          <SearchBar filtered={this.filtered} />
        </FlexBox>
        {filtered_meetings}
      </ConvoGrid>
    );
  }
}
ScreensMeetingList.propTypes = {};

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(ScreensMeetingList);
