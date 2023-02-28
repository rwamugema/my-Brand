

const e = React.createElement;

class singleblog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            blog: [],
            comment: []
        }
    }

    async componentDidMount(){
 const urlParams = new URL(window.location).searchParams;
 const nameId = urlParams.get("id");
 const response = await fetch('https://naughty-jay-tank-top.cyclic.app/api/v1/blogs')
 const data = await response.json()
 const post = data.filter((e) => e._id === nameId)
 const blog = this.setState({
    isLoaded: true,
    blog: post
 })
         const comments= await fetch(`https://naughty-jay-tank-top.cyclic.app/api/v1/blogs/${nameId}/comment`)
         const c = await comments.json()
         const comment = this.setState({
            comment: c
         })
    }
  
    render(){
        const likePost =  async ()=>{
            const accessToken =JSON.parse(localStorage.getItem('user'))
            const token = accessToken[0].token
            const urlParams = new URL(window.location).searchParams;
            const nameId = urlParams.get("id");
            const response =  await fetch(`https://naughty-jay-tank-top.cyclic.app/api/v1/blogs/${nameId}/likes`,{
            method:'POST',
            headers:{
              Authorization: `bearer ${token}`
            }
           })
           }
        const {isLoaded, blog, comment} = this.state
        if (!isLoaded) {
            return <div className="ftb">
                   <div id="head">
                    <h2>loading</h2>
                   </div>
            </div>
        }else{
            return ( 
                blog.map(element => (
      <div className="ftb" key={element._id}>
      <div id="head">
      <h2>{element.category}</h2>
      <h2>{element.title}</h2>
    </div>
    <div className="cont-ner">
  <img src={element.image} alt="" className="article-image" />
  <div id="contents">
  <div id="likePost">
  <span><i onClick={likePost} className="fa fa-thumbs-up"></i>{element.likes}</span>
    </div>
    <p>{element.content}</p>
    </div>
    </div>
  </div>
  ))
  )
  
}
}
}

const blogContainer = document.querySelector('.ftb')
const commentContainer = document.querySelector('.comment')
const root = ReactDOM.createRoot(blogContainer)
root.render(e(singleblog))