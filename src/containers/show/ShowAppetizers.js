import React,{Component} from 'react';
import {connect} from "react-redux";
import $ from 'jquery';
import Appetizer from "../../components/view/appetizer";
import {getAppetizers} from "../../actions/appetizerActions";
import { Link } from 'react-router-dom';
class ShowAppetizers extends Component{
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            maxItemsPerPage:4,
            appetizersToShow:[
                {
                    category: "Sea Food",
                    description: "A little dish with marinated meat ↵such as fish, seafood or both - in citrus dressings.",
                    id: "1ENTR",
                    name: "Ceviche",
                    picture: "/img/entrees/ceviche.png",
                    price: "6.50"
                },
                {
                    category: "Salad",
                    description: "A bed of romaine lettuce, followed ↵by grilled peppers, corn, and shrimp. Then we ↵brighten this salad up with chopped grape tomatoes, a ↵diced avocado, and cucumbers.",
                    id: "2ENTR",
                    name: "Grilled Shrimp Salad",
                    picture: "/img/entrees/grilled-shrimp-salad.png",
                    price: "7.50"
                }
            ],
            firstItemToShow:0,
            totalPagination:[1,2]
        }
    }
    
    async componentDidMount(){
        await this.props.getAppetizers();
        const {appetizers}=this.props;
        this.setState({
            totalItems:appetizers.length
        });
        var tempTotalPages=Math.ceil(this.state.totalItems/this.state.maxItemsPerPage);
        var tempItems=[];
        for (let index = 1; index <= tempTotalPages; index++) {
            tempItems.push(index);
        }
        this.setState({
            totalPagination:tempItems
        });
        this.setAppetizersItems();
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
            console.log('An error occurs in ShowAppetizers.componentWillReceiveProps(),but don\'t worry about it :) ');
            console.log(error);
        }
    }
    renderAppetizers=()=>{
        if(this.state.appetizersToShow.length===0){
            return(
                <div>
                    Loading
                </div>
            )
        }
        else{
            return(
                this.state.appetizersToShow.map(appetizer=>
                    <Appetizer key={appetizer.id} info={appetizer}/> 
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
                this.props.history.push("/admin/appetizers/"+tempCurrentPage);
            }
        } catch (error) {
            console.log("An error occurs in ShowAppetizers.getNextPage(),but don\'t worry about it :)");
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
                this.props.history.push("/admin/appetizers/"+tempCurrentPage); 
            }
        } catch (error) {
            console.log("An error occurs in ShowAppetizers.getPrevPage(),but don\'t worry about it :)");
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
                this.setAppetizersItems(); 
            }, 300);
        } catch (error) {
            console.log('An error occurs in ShowAppetizers.getPage() , but don\'t worry about it');
            console.log(error);
        }
    }
    setAppetizersItems=()=>{
        const {appetizers}=this.props;
        var tempAppetizersToShow=[];
        var maxItemsLenght=parseInt(this.state.maxItemsPerPage*this.state.currentPage);
        try {
            let index = this.state.firstItemToShow;
            do{ 
                if(maxItemsLenght>appetizers.length){
                    maxItemsLenght=appetizers.length;
                }
                if(appetizers[index].name!==null   ){
                    tempAppetizersToShow.push(appetizers[index]);
                }
                this.setState({
                    appetizersToShow:tempAppetizersToShow
                })
                index++;
            }
            while(index <=maxItemsLenght);
        } 
        catch (error) {
            console.log('An error occurs in ShowAppetizers.setAppetizersItems() dont worry about');
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
                                        <Link to={`/admin/appetizers/${index}`} className="page-link" onClick={()=>this.getPage(index)}>{index}</Link>
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
        const {appetizers}=this.props;
        if(!appetizers){
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
                        {this.renderAppetizers()}
                        {this.getPagination()}
                        </ul>
                    </div>
                </div> 
            </React.Fragment>
        )
    }
}
const mapStateToProps=state=>({
    appetizers:state.appetizers.appetizers
})
export default connect(mapStateToProps,{getAppetizers})(ShowAppetizers);