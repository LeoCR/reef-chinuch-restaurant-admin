import React,{Component} from 'react';
import {connect} from "react-redux";
import MainCourse from "../../components/view/mainCourse";
import {getMainCourses} from "../../actions/mainCourseActions";
import $ from 'jquery';
import { Link } from 'react-router-dom';
class ShowMainCourses extends Component{
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            maxItemsPerPage:3,
            mainCoursesToShow:[
                {
                    category: "fish",
                    description: "Srhimp Salad",
                    id: "10BGD",
                    name: "Srhimp Avocado Roasted Salad",
                    picture: "/img/uploads/shrimp-avocado-roasted-corn-salad.jpg",
                    price: "7.50"
                },
                {
                    category: "Soups",
                    description: "Aztec Soup with Avocado",
                    id: "11BGD",
                    name: "Aztec Soup",
                    picture: "/img/uploads/aztec-soup.jpg",
                    price: "7.50"  
                },
               { 
                    category: "Pasta",
                    description: "Made with stacked layers of pasta alternated with sauces and chicken plus vegetables and cheese, and sometimes topped with melted  ",
                    id: "1BGD",
                    name: "Lasagna of Chicken",
                    picture: "/img/strong-dish/lasagna.png",
                    price: "14.35"
                }
            ],
            firstItemToShow:0,
            totalPagination:[1,2]
        }
    }
    async componentDidMount(){ 
        await this.props.getMainCourses();
        const {mainCourses}=this.props;
        this.setState({
            totalItems:mainCourses.length
        }); 
        var tempTotalPages=Math.ceil(mainCourses.length/this.state.maxItemsPerPage);
        var tempItems=[];
        for (let index = 1; index <= tempTotalPages; index++) {
            tempItems.push(index);
        }
        this.setState({
            totalPagination:tempItems
        });  
        this.setMainCoursesItems();
    }
    componentWillReceiveProps(nextProps) {
        try {
            if(nextProps.match.params.page!==null){
                const {page}=nextProps.match.params;
                if(isNaN(page)===false){
                    this.setState({
                        currentPage:page 
                    });
                    this.getPage(page); 
                    setTimeout(() => {    
                        document.querySelector("#page-item-"+page).classList.add("active");
                    }, 1200);
                }
            }
        } 
        catch (error) {
            console.log('An error occurs in ShowMainCourses.componentWillReceiveProps(),but don\'t worry about it :) ');
            console.log(error);
        }
    }
    renderMainCourses=()=>{
        if(this.state.mainCoursesToShow.length===0){
            return(
                <div>
                    Loading
                </div>
            )
        }
        else{
            return(
                this.state.mainCoursesToShow.map(mainCourse=>
                    <MainCourse key={mainCourse.id} info={mainCourse}/> 
                )
            )
        }
    }
    getNextPage=()=>{ 
        try {
            if(this.state.currentPage<this.state.totalPagination.length){
                if($('.page-nav').hasClass('active')){
                    $('.page-nav').removeClass('active');
                }
                var tempCurrentPage=parseInt(this.state.currentPage)+1;
                var tempFirstItemToShow=(tempCurrentPage*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
                this.setState({
                    currentPage:tempCurrentPage,
                    firstItemToShow:tempFirstItemToShow
                });
                this.props.history.push("/admin/main-courses/"+tempCurrentPage)
            }
        } catch (error) {
            console.log("An error occurs in ShowMainCourses.getNextPage(),but don\'t worry about it :)");
            console.log(error);
        }
    }
    getPrevPage=()=>{
        try {
            if(this.state.currentPage>1){
                if($('.page-nav').hasClass('active')){
                    $('.page-nav').removeClass('active');
                }
                var tempCurrentPage=parseInt(this.state.currentPage)-1;
                var tempFirstItemToShow=(tempCurrentPage*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
                this.setState({
                    firstItemToShow:tempFirstItemToShow,
                    currentPage:tempCurrentPage
                });
                this.props.history.push("/admin/main-courses/"+tempCurrentPage);
            } 
        } catch (error) {
            console.log("An error occurs in ShowMainCourses.getPrevPage(),but don\'t worry about it :)");
            console.log(error);
        }
    }
    getPage=(index)=>{
        try {
            var tempFirstItemToShow=(index*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
            if($('.page-nav').hasClass('active')){
                $('.page-nav').removeClass('active');
            }
            setTimeout(() => {
                $('.page-nav:nth-child('+ parseInt(index+1)+')').addClass('active');
                this.setState({
                    currentPage:index,
                    firstItemToShow:tempFirstItemToShow
                });
                this.setMainCoursesItems(); 
            }, 200);
        } catch (error) {
            console.log('An error occurs in ShowMainCourses.getPage() , but don\'t worry about it');
            console.log(error);
        }
    }
    setMainCoursesItems=()=>{
        const {mainCourses}=this.props;
        var tempMainCoursesToShow=[];
        var maxItemsLenght=parseInt(this.state.maxItemsPerPage*this.state.currentPage);
        try {
            let index = this.state.firstItemToShow;
            do{ 
                if(maxItemsLenght>mainCourses.length){
                    maxItemsLenght=mainCourses.length;
                }
                if(mainCourses[index].name!==null){
                    tempMainCoursesToShow.push(mainCourses[index]);
                }
                this.setState({
                    mainCoursesToShow:tempMainCoursesToShow
                })
                index++;
            }
            while(index <=maxItemsLenght);
        } 
        catch (error) {
            console.log('An error occurs in ShowMainCourses.setMainCoursesItems(), but don\'t worried about :)');
            console.log(error);
        }
    }
    getPagination=()=>{
        return(
            <React.Fragment>
                <div style={{textAlign:'center'}}>
                    <nav id="pagination-bottom">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" onClick={()=>this.getPrevPage()}>Previous</a>
                            </li> 
                            {
                                this.state.totalPagination.map((index,key)=> 
                                    <li className="page-item page-nav" id={`page-item-${index}`} key={key}>
                                        <Link to={`/admin/main-courses/${index}`} className="page-link" onClick={()=>this.getPage(index)}>{index}</Link>
                                    </li>
                                )
                            }
                            <li className="page-item">
                                <a className="page-link" onClick={()=>this.getNextPage()}>Next</a>
                            </li> 
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        )
    }
    render(){
        const {mainCourses}=this.props;
        if(!mainCourses){
            return(
                <div>
                    <p>Loading Data From Database ,please Wait...</p>
                </div>
            )
        }
        return(
            <React.Fragment>
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <ul>
                            {this.renderMainCourses()}
                            {this.getPagination()}
                        </ul>
                    </div>
                </div> 
            </React.Fragment>
        )
    }
}
const mapStateToProps=state=>({
    mainCourses:state.mainCourses.mainCourses
})
export default connect(mapStateToProps,{getMainCourses})(ShowMainCourses);