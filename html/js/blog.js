
const e= React.createElement

class blog extends React.Component{
 constructor(props){
    super(props);
    this.state = {
        blog:[],
        isLoaded: false
    }
}

async componentDidMount(){
    
    const response = await fetch('https://naughty-jay-tank-top.cyclic.app/api/v1/blogs')
    const data = await response.json()
    const blog = this.setState({
        blog: data,
        isLoaded: true
    });
}
    render(){
        const {isLoaded, blog} = this.state
      if (!isLoaded) {
        return <div id="loader">
            </div>
            }else{
           return (  
                blog.map(post => (
                      <div className="blogcontainer" key={post._id}>
                      <span>{post.category}</span>
                      <img src={post.image} />
                      <div className="container">
                      <div id="head">
                      <h1>{post.title}</h1>
                      </div>
                      <div id="content">
                      <p>{post.summary}</p>
                      </div>
                      <button id="button"> <h4 onClick={()=>{window.location.href=`./singleblog.html?id=${post._id}`}}>read more</h4></button>
                      </div>
                      </div>
                     )
                     )
                     )
                    }
                }
            }

const blogContainer = document.querySelector('#section')
const root = ReactDOM.createRoot(blogContainer)
root.render(e(blog))