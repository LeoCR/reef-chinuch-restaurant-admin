import React,{Component} from 'react';
import {connect} from "react-redux";
import {showMainCourse,editMainCourse,updateMainCourse,getMainCourses} from "../../actions/mainCourseActions";
import {getIngredientsByDishId,deleteIngredientDish} from "../../actions/ingredientByDishActions";
import {setDishId,setAddIngredient,setNextIdDishIngredient} from '../../actions/modalActions';
import {openModal} from '../../helper/modal.helper';
import api from '../../api/api';
class EditMainCourse extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            description:'',
            picture:'',
            category:'',
            subcategory:'',
            price:'',
            error:false,
            changedPicture:false,
            ingredientsByDish:[]
        }
    }
    onAddIngredient=(e)=>{
        e.preventDefault();
        this.props.setAddIngredient();
        setTimeout(() => {
            openModal();
        }, 500);
    }
    id=(e)=>{
        this.setState({
            id:e.target.value
        });
    }
    componentDidMount=async()=>{
        const {id}=this.props.match.params;
        this.props.getMainCourses();
        this.props.showMainCourse(id);
        this.props.setDishId(id);
        this.props.getIngredientsByDishId(id);
        var _this=this;
        await api.get('/api/ingredient-to-dish/count/')
        .then((res)=>{
            if(res.data.maxingredientdishid){
                var nextIdIngDish=parseInt(res.data.maxingredientdishid)+1;
                _this.props.setNextIdDishIngredient(nextIdIngDish)
            }
        })
    }
    componentWillReceiveProps(nextProps,nextState){
        if(nextProps.ingredientsByDish){
            this.setState({
                ingredientsByDish:nextProps.ingredientsByDish
            })
        }
        if(nextProps.mainCourse){
            const {id, name,price,description,category,subcategory,picture}=nextProps.mainCourse;
            this.setState({
                id,
                name,
                description,
                category,
                subcategory,
                picture,
                price
            })
            console.log(nextProps.mainCourse);
        }
    }
    nameDish=(e)=>{
        this.setState({
            name:e.target.value
        });
    }
    descriptionDish=(e)=>{
        this.setState({
            description:e.target.value
        });
    }
    pictureDish=(e)=>{
        if(e.target.files[0]!==null){
            this.setState({
                picture:e.target.files[0],
                changedPicture:true
            });  
        }
    }
    categoryDish=(e)=>{
        this.setState({
            category:e.target.value
        });
    }
    subcategoryDish=(e)=>{
        this.setState({
            subcategory:e.target.value
        });
    }
    priceDish=(e)=>{
        this.setState({
            price:e.target.value
        });
    }
    submitEditMainCourse=(e)=>{    
        e.preventDefault();
        const {
            id ,
            name,
            description,
            price,
            category,
            subcategory,
            picture,
            changedPicture
        } =this.state;
        var formData=new FormData(),
        _this=this;
        if(name===''||price===''||description===''||category===''||subcategory===''||picture===''){
            this.setState({
                error:true
            });
        }
        else{
            this.setState({
                error:false
            });
            const infoDish={
                id,
                name,
                price,
                description,
                category,
                subcategory,
                picture
            }
            formData.append('id',id);
            formData.append('name',name);
            formData.append('price',price);
            formData.append('description',description);
            formData.append('picture',picture);
            formData.append('category',category);
            formData.append('subcategory',subcategory);
            if(this.props.ingredientsByDish.length>0 ){
                _this.props.ingredientsByDish.forEach(function(ing) {
                    api.post('/api/ingredient-to-dish/add/',ing)
                    .then((res)=>{
                        console.log(res);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                });
            }
            if(changedPicture===false){
                this.props.editMainCourse(infoDish,id);
            }
            else{
                this.props.updateMainCourse(formData,id);
            }
            setTimeout(() => {
                _this.props.getMainCourses();
                _this.props.history.push('/admin/main-courses'); 
            }, 1900);
        }
    }
    deleteIngredientDish=(e,ing)=>{
        e.preventDefault();
        this.props.deleteIngredientDish(ing.id_ingredient_dish);
    }
    getIngredientsByDish=()=>{
        if(this.state.ingredientsByDish.length>0 ){
            return(
                <React.Fragment>
                    <h1>Ingredients</h1>
                    <button id="add-ingredient" className="btn btn-success" 
                        onClick={(e)=>this.onAddIngredient(e)}>
                            Add Ingredient
                    </button>
                    <div className="ingredients-container">
                        {this.state.ingredientsByDish.map(ing=>
                            <div className="ing-box">
                                <button className="btn btn-delete" onClick={(e)=>this.deleteIngredientDish(e,ing)}>X</button>
                                <h5>{ing.name}</h5>
                                <img src={ing.img} alt={ing.name} style={{maxWidth:'130px',float:'left',margin:'10px',maxHeight:'80px'}}/>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            )
        }  
        else{
            return(
                <React.Fragment>
                    <button id="add-ingredient" className="btn btn-success" 
                        onClick={(e)=>this.onAddIngredient(e)}>
                            Add Ingredient
                    </button>
                    <p>No Ingredients</p>       
                </React.Fragment>
            )
        }    
    }
    render(){
        const {name,price,description,category,subcategory,picture,error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Edit Main Course</h2>
                            <form onSubmit={this.submitEditMainCourse} id="form-strong-dish-update" encType="multipart/form-data">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.id} className="" style={{display:'none'}}
                                    name="id"/>
                                    <input type="text" defaultValue={name} onChange={this.nameDish} 
                                    className="form-control" placeholder="Name"
                                    name="name"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea type="text" 
                                    value={description} 
                                    onChange={this.descriptionDish} className="form-control" 
                                    placeholder="Description"
                                    name="description"></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" id="picture_upload" defaultValue={picture} 
                                    onChange={this.pictureDish} className="form-control-file"
                                    placeholder="Picture" />
                                    <img src={picture} style={{maxWidth:'400px'}} alt={name}/>
                                    <input type="text" defaultValue={picture} className="form-control-file"
                                    readonly="readonly" name="picture" id="picture_hidden" style={{display:"none"}}/>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" defaultValue={category} 
                                    onChange={this.categoryDish} className="form-control"
                                    placeholder="Category" 
                                    name="category"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Subcategory</label>
                                    <input type="text" defaultValue={subcategory} 
                                    onChange={this.subcategoryDish} className="form-control"
                                    placeholder="Subcategory" 
                                    name="subcategory"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" defaultValue={price} 
                                    onChange={this.priceDish} 
                                    className="form-control"
                                    placeholder="Price" 
                                    name="price"
                                     />
                                </div>
                            {this.getIngredientsByDish()}
                            {error ? 
                            <div className="font-weight-bold alert-danger text-center mt-4">
                                All the fields are required
                            </div>
                            :''
                            }
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Update</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=state=>({
    mainCourse:state.mainCourses.mainCourse,
    mainCourses:state.mainCourses.mainCourses,
    ingredientsByDish:state.ingredientsByDish.ingredientsByDish,
    idDish:state.modals.idDish,
    nextIdDishIngredient:state.modals.nextIdDishIngredient
})
export default connect(mapStateToProps,{deleteIngredientDish,setNextIdDishIngredient,setDishId,setAddIngredient,getIngredientsByDishId,showMainCourse,editMainCourse,updateMainCourse,getMainCourses})(EditMainCourse);