import React, { Component } from 'react';
import * as Survey from 'survey-react';
import { API_URL } from './config';
import 'survey-react/survey.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css'
import './style/questionnaires.css';
import 'react-showdown';
import './style/intro.css';

/*
var myCss = {
matrix: {
    root: "table table-striped"
},
navigationButton: "button btn-lg"
};
*/

class Questionnaires extends Component {

  constructor(props) {
    super(props);

    this.state = {
      UserNo:1,
      isCompleted: 0,
      resultAsString: {},
    };

    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

  onCompleteComponent(survey) {

    var page = survey.currentPage;
    var valueName = "PageNo" + (survey.pages.indexOf(page)+1);
    var seconds = Math.round(performance.now())

    survey.setValue(valueName, seconds);

    var resultAsString = JSON.stringify(survey.data);

    this.setState({
      isCompleted: 1,
      resultAsString: resultAsString
    });
  }

  //JSON string – "{\"PageNo0\":304,\"IQ_8_Q\":\"L\",\"PageNo1\":3494,\"PageNo2\":7938,\"PageNo3\":9392,\"PageNo4\":10985}" (main.chunk.js, line 3699)
 //"training_behaviour" – "{\"SumPassed\":1,\"ChoicesSize\":[[8,3]],\"ChoicesCorrect\":[[0,1]],\"InitialSamplesSize\":[[3,3,4]],\"Chosen\":[2],\"CorrectAns\":[2],\"ReactionTimes\":[…"

  timerCallback(survey){
    var page = survey.currentPage;
    var valueName = "PageNo" + survey.pages.indexOf(page);
    var seconds = Math.round(performance.now())
    survey.setValue(valueName, seconds);
  }

  sendQuestionnaires(user_no_){

    var resultAsString = this.state.resultAsString;

    fetch(`${API_URL}/questionnaires_behaviour/` + user_no_, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: resultAsString
     })
  }


  componentDidMount() {
    Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
  }

  render() {
    var json = { title: "Form", showProgressBar: "top", pages: [

      {questions: [
          { type: "radiogroup", name: "IQ_1", //isRequired: true,
              title: "What number is one fifth of one fourth of one ninth of 900?",
              //colCount: 4,
              choices: [
                {value:1, text:"2"},
                {value:2, text:"3"},
                {value:3, text:"4"},
                {value:4, text:"5"},
                {value:5, text:"6"},
                {value:6, text:"7"}
              ]},

          { type: "radiogroup", name: "IQ_2", //isRequired: true,
              title: "Zach is taller than Matt and Richard is shorter than Zach. Which of the following statements would be the most accurate?",
              choices: [
                {value:1, text:"Richard is taller than Matt"},
                {value:2, text:"Richard is shorter than Matt"},
                {value:3, text:"Richard is as tall as Matt"},
                {value:4, text:"It's impossible to tell"}
              ]},

          { type: "radiogroup", name: "IQ_3", //isRequired: true,
              title: "Joshua is 12 years old and his sister is three times as old as he. When Joshua is 23 years old, how old will his sister be?",
              choices: [
                {value:1, text:"25"},
                {value:2, text:"39"},
                {value:3, text:"44"},
                {value:4, text:"47"},
                {value:5, text:"53"}
              ]},

          { type: "radiogroup", name: "IQ_4", //isRequired: true,
              title: "If the day after tomorrow is two days before Thursday then what day is it today?",
              choices: [
                {value:1, text:"Friday"},
                {value:2, text:"Monday"},
                {value:3, text:"Wednesday"},
                {value:4, text:"Saturday"},
                {value:5, text:"Tuesday"},
                {value:6, text:"Sunday"}
              ]},

          { type: "radiogroup", name: "IQ_5", //isRequired: true,
              title: "In the following alphanumeric series, what letter comes next? K N P S U ...?",
              choices: [
                {value:1, text:"S"},
                {value:2, text:"T"},
                {value:3, text:"U"},
                {value:4, text:"V"},
                {value:5, text:"W"},
                {value:6, text:"X"}
              ]},

          { type: "radiogroup", name: "IQ_6", //isRequired: true,
              title: "In the following alphanumeric series, what letter comes next? V Q M J H ...?",
              choices: [
                {value:1, text:"E"},
                {value:2, text:"F"},
                {value:3, text:"G"},
                {value:4, text:"H"},
                {value:5, text:"I"},
                {value:6, text:"J"}
              ]},

          { type: "radiogroup", name: "IQ_7", //isRequired: true,
              title: "In the following alphanumeric series, what letter comes next? I J L O S ...?",
              choices: [
                {value:1, text:"T"},
                {value:2, text:"U"},
                {value:3, text:"V"},
                {value:4, text:"X"},
                {value:5, text:"Y"},
                {value:6, text:"Z"}
              ]},

          { type: "radiogroup", name: "IQ_8", //isRequired: true,
              title: "In the following alphanumeric series, what letter comes next? Q S N P L ...?",
              choices: [
                {value:1, text:"J"},
                {value:2, text:"H"},
                {value:3, text:"I"},
                {value:4, text:"N"},
                {value:5, text:"M"},
                {value:6, text:"L"}
              ]},
      ]},

      {questions: [
          { type: "html",
            name: "info",
            html: "<table><body></br></br></br></br><img src='images_quest/mx45_q.png' width='230px'/></br></br></br> </td><img src='images_quest/mx45_a.png' width='460px'/></body></table>"},
          { type: "radiogroup", name: "IQimage_1", //isRequired: true,
            title: "Which figure fits into the missing slot?",
            choices: [
              {value:1, text:"A"},
              {value:2, text:"B"},
              {value:3, text:"C"},
              {value:4, text:"D"},
              {value:5, text:"E"},
              {value:6, text:"F"}
            ]},

          { type: "html",
            name: "info",
            html: "<table><body></br></br></br></br><img src='images_quest/mx46_q.png' width='230px'/></br></br></br> </td><img src='images_quest/mx46_a.png' width='460px'/></body></table>"},
          { type: "radiogroup", name: "IQimage_2", //isRequired: true,
            title: "Which figure fits into the missing slot?",
            choices: [
              {value:1, text:"A"},
              {value:2, text:"B"},
              {value:3, text:"C"},
              {value:4, text:"D"},
              {value:5, text:"E"},
              {value:6, text:"F"}
            ]},

          { type: "html",
            name: "info",
            html: "<table><body></br></br></br></br><img src='images_quest/mx47_q.png' width='230px'/></br></br></br> </td><img src='images_quest/mx47_a.png' width='460px'/></body></table>"},
          { type: "radiogroup", name: "IQimage_3", //isRequired: true,
            title: "Which figure fits into the missing slot?",
            choices: [
              {value:1, text:"A"},
              {value:2, text:"B"},
              {value:3, text:"C"},
              {value:4, text:"D"},
              {value:5, text:"E"},
              {value:6, text:"F"}
            ]},

          { type: "html",
            name: "info",
            html: "<table><body></br></br></br></br><img src='images_quest/mx55_q.png' width='230px'/></br></br></br> </td><img src='images_quest/mx55_a.png' width='460px'/></body></table>"},
          { type: "radiogroup", name: "IQimage_4", //isRequired: true,
            title: "Which figure fits into the missing slot?",
            choices: [
              {value:1, text:"A"},
              {value:2, text:"B"},
              {value:3, text:"C"},
              {value:4, text:"D"},
              {value:5, text:"E"},
              {value:6, text:"F"}
            ]},

          { type: "html",
            name: "info",
            html: "<table><body></br></br></br></br><img src='images_quest/rsd3_q.png' width='550px'/></body></table>"},
          { type: "radiogroup", name: "IQimage_5", //isRequired: true,
            title: "All the cubes below have a different image on each side. Select the choice that represents a rotation of the cube labeled X.",
            choices: [
              {value:1, text:"A"},
              {value:2, text:"B"},
              {value:3, text:"C"},
              {value:4, text:"D"},
              {value:5, text:"E"},
              {value:6, text:"F"},
              {value:7, text:"G"},
              {value:8, text:"H"}
            ]},

          { type: "html",
            name: "info",
            html: "<table><body></br></br></br></br><img src='images_quest/rsd4_q.png' width='550px'/></body></table>"},
          { type: "radiogroup", name: "IQimage_6", //isRequired: true,
            title: "All the cubes below have a different image on each side. Select the choice that represents a rotation of the cube labeled X.",
            choices: [
              {value:1, text:"A"},
              {value:2, text:"B"},
              {value:3, text:"C"},
              {value:4, text:"D"},
              {value:5, text:"E"},
              {value:6, text:"F"},
              {value:7, text:"G"},
              {value:8, text:"H"}
            ]},

          { type: "html",
            name: "info",
            html: "<table><body></br></br></br></br><img src='images_quest/rsd6_q.png' width='550px'/></body></table>"},
          { type: "radiogroup", name: "IQimage_7", //isRequired: true,
            title: "All the cubes below have a different image on each side. Select the choice that represents a rotation of the cube labeled X.",
            choices: [
              {value:1, text:"A"},
              {value:2, text:"B"},
              {value:3, text:"C"},
              {value:4, text:"D"},
              {value:5, text:"E"},
              {value:6, text:"F"},
              {value:7, text:"G"},
              {value:8, text:"H"}
            ]},

          { type: "html",
            name: "info",
            html: "<table><body></br></br></br></br><img src='images_quest/rsd8_q.png' width='550px'/></body></table>"},
          { type: "radiogroup", name: "IQimage_8", //isRequired: true,
            title: "All the cubes below have a different image on each side. Select the choice that represents a rotation of the cube labeled X.",
            choices: [
              {value:1, text:"A"},
              {value:2, text:"B"},
              {value:3, text:"C"},
              {value:4, text:"D"},
              {value:5, text:"E"},
              {value:6, text:"F"},
              {value:7, text:"G"},
              {value:8, text:"H"}
            ]},
    ]},

        {questions: [
            { type: "matrix", name: "ASRS", title: "Please indicate what best describes how you have felt and conducted yourself over the past 6 months. ",
                columns: [
                    { value: 1, text: "Never" },
                    { value: 2, text: "Rarely" },
                    { value: 3, text: "Sometimes" },
                    { value: 4, text: "Often" },
                    { value: 5, text: "Very Often" }],
                rows: [
                    { value: "ASRS_1",       text: "1. How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?" },
                    { value: "ASRS_2",       text: "2. How often do you have difficulty getting things in order when you have to do a task that requires organization?" },
                    { value: "ASRS_3",       text: "3. How often do you have problems remembering appointments or obligations?" },
                    { value: "ASRS_4",       text: "4. When you have a task that requires a lot of thought, how often do you avoid or delay getting started?" },
                    { value: "ASRS_5",       text: "5. How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?" },
                    { value: "ASRS_6",       text: "6. How often do you feel overly active and compelled to do things, like you were driven by a motor?" },
                    { value: "ASRS_7",       text: "7. How often do you make careless mistakes when you have to work on a boring or difficult project?" },
                    { value: "ASRS_8",       text: "8. How often do you have difficulty keeping your attention when you are doing boring or repetitive work?" },
                    { value: "ASRS_9",       text: "9. How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?" },
                    { value: "ASRS_10",      text: "10. How often do you misplace or have difficulty finding things at home or at work?" },
                    { value: "ASRS_11",      text: "11. How often are you distracted by activity or noise around you?" },
                    { value: "ASRS_12",      text: "12. How often do you leave your seat in meetings or other situations in which you are expected to remain seated?" },
                    { value: "ASRS_13",      text: "13. How often do you feel restless or fidgety?" },
                    { value: "ASRS_14",      text: "14. How often do you have difficulty unwinding and relaxing when you have time to yourself?" },
                    { value: "ASRS_15",      text: "15. How often do you find yourself talking too much when you are in social situations?" },
                    { value: "ASRS_16",      text: "16. When you’re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?" },
                    { value: "ASRS_17",      text: "17. How often do you have difficulty waiting your turn in situations when turn taking is required?" },
                    { value: "ASRS_18",      text: "18. How often do you interrupt others when they are busy?" }
                  ]},
        ]},

        {questions: [
            { type: "matrix", name: "BIS11", title: "People differ in the ways they act and think in different situations. This is a test to measure some of the ways in which you act and think. Do not spend too much time on any statement. Answer quickly and honestly.",
                columns: [
                    { value: 1, text: "Rarely/Never" },
                    { value: 2, text: "Occasionally" },
                    { value: 3, text: "Often" },
                    { value: 4, text: "Almost Always/Always" }],
                rows: [
                    { value: "BIS11_1",    text: "1. I plan tasks carefully." },
                    { value: "BIS11_2",    text: "2. I do things without thinking." },
                    { value: "BIS11_3",    text: "3. I make-up my mind quickly." },
                    { value: "BIS11_4",    text: "4. I am happy-go-lucky." },
                    { value: "BIS11_5",    text: "5. I don’t “pay attention.”" },
                    { value: "BIS11_6",    text: "6. I have “racing” thoughts." },
                    { value: "BIS11_7",    text: "7. I plan trips well ahead of time." },
                    { value: "BIS11_8",    text: "8. I am self controlled." },
                    { value: "BIS11_9",    text: "9. I concentrate easily." },
                    { value: "BIS11_10",   text: "10. I save regularly." },
                    { value: "BIS11_11",   text: "11. I “squirm” at plays or lectures." },
                    { value: "BIS11_12",   text: "12. I am a careful thinker." },
                    { value: "BIS11_13",   text: "13. I plan for job security." },
                    { value: "BIS11_14",   text: "14. I say things without thinking." },
                    { value: "BIS11_15",   text: "15. I like to think about complex problems." },
                    { value: "BIS11_16",   text: "16. I change jobs." },
                    { value: "BIS11_17",   text: "17. I act “on impulse.”" },
                    { value: "BIS11_18",   text: "18. I get easily bored when solving thought problems." },
                    { value: "BIS11_19",   text: "19. I act on the spur of the moment." },
                    { value: "BIS11_20",   text: "20. I am a steady thinker." },
                    { value: "BIS11_21",   text: "21. I change residences." },
                    { value: "BIS11_22",   text: "22. I buy things on impulse." },
                    { value: "BIS11_23",   text: "23. I can only think about one thing at a time." },
                    { value: "BIS11_24",   text: "24. I change hobbies." },
                    { value: "BIS11_25",   text: "25. I spend or charge more than I earn." },
                    { value: "BIS11_26",   text: "26. I often have extraneous thoughts when thinking." },
                    { value: "BIS11_27",   text: "27. I am more interested in the present than the future." },
                    { value: "BIS11_28",   text: "28. I am restless at the theater or lectures." },
                    { value: "BIS11_29",   text: "29. I like puzzles." },
                    { value: "BIS11_30",   text: "30. I am future oriented." }
                  ]},
        ]},

        {questions: [
            {   type: "matrix", name: "IUS", /*isAllRowRequired: true,*/
                title: "You will find below a series of statements which describe how people may react to the uncertainties of life. Please use the scale below to describe to what extent each item is characteristic of you.",
                columns: [
                    { value: 1, text: "1 - Not at all" },
                    { value: 2, text: "2" },
                    { value: 3, text: "3 - Somewhat" },
                    { value: 4, text: "4" },
                    { value: 5, text: "5 - Entirely" }
                  ],
                rows: [
                    { value: "IUS_1",   text: "1. Uncertainty stops me from having a firm opinion." },
                    { value: "IUS_2",   text: "2. Being uncertain means that a person is disorganized." },
                    { value: "IUS_3",   text: "3. Uncertainty makes life intolerable." },
                    { value: "IUS_4",   text: "4. It’s unfair not having any guarantees in life." },
                    { value: "IUS_5",   text: "5. My mind can’t be relaxed if I don’t know what will happen tomorrow." },
                    { value: "IUS_6",   text: "6. Uncertainty makes me uneasy, anxious, or stressed." },
                    { value: "IUS_7",   text: "7. Unforeseen events upset me greatly." },
                    { value: "IUS_8",   text: "8. It frustrates me not having all the information I need." },
                    { value: "IUS_9",   text: "9. Uncertainty keeps me from living a full life." },
                    { value: "IUS_10",  text: "10. One should always look ahead so as to avoid surprises." },
                    { value: "IUS_11",  text: "11. A small unforeseen event can spoil everything, even with the best of planning." },
                    { value: "IUS_12",  text: "12. When it’s time to act, uncertainty paralyses me." },
                    { value: "IUS_13",  text: "13. Being uncertain means that I am not first rate." },
                    { value: "IUS_14",  text: "14. When I am uncertain, I can’t go forward." },
                    { value: "IUS_15",  text: "15. When I am uncertain I can’t function very well." },
                    { value: "IUS_16",  text: "16. Unlike me, others always seem to know where they are going with their lives." },
                    { value: "IUS_17",  text: "17. Uncertainty makes me vulnerable, unhappy, or sad." },
                    { value: "IUS_18",  text: "18. I always want to know what the future has in store for me." },
                    { value: "IUS_19",  text: "19. I can’t stand being taken by surprise." },
                    { value: "IUS_20",  text: "20. The smallest doubt can stop me from acting." },
                    { value: "IUS_21",  text: "21. I should be able to organize everything in advance." },
                    { value: "IUS_22",  text: "22. Being uncertain means that I lack confidence." },
                    { value: "IUS_23",  text: "23. I think it’s unfair that other people seem sure about their future." },
                    { value: "IUS_24",  text: "24. Uncertainty keeps me from sleeping soundly." },
                    { value: "IUS_25",  text: "25. I must get away from all uncertain situations." },
                    { value: "IUS_26",  text: "26. The ambiguities in life stress me." },
                    { value: "IUS_27",  text: "27. I can’t stand being undecided about my future." }
                  ]},
        ]}
    ]};

    if(this.state.isCompleted===0){
      return(
        <div>
          <div className="IntroConsentText">
            <p><span className="bold">STUDY PART 1/2</span></p>
            Thank you for joining our study. Here is the 1st part in which we ask you questions about reasoning and about yourself. Please take your time to answer. Once you have answered all questions in the form bellow, you will proceed to the computer game.
            <br/><br/>
            <Survey.Survey json={json} showCompletedPage={false} onComplete={this.onCompleteComponent} onCurrentPageChanged={this.timerCallback}/>
          </div>
        </div>
      );
    }
    else {
      console.log("JSON string",this.state.resultAsString);

      this.sendQuestionnaires(this.state.UserNo);

      this.props.history.push({
        pathname: `/Task`,
        //state: {participant_info: this.props.location.state.participant_info, newblock_frame: true} // to be changed
      })

      return null
    }
  }
}

export default Questionnaires;