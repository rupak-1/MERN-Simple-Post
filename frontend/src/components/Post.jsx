
export default function Post(props) {
    const dateObj = new Date(props.post.createdAt);
    const localTime = dateObj.toLocaleTimeString();
    const localDate = dateObj.toLocaleDateString();

    const deleteHandler = () => {
        fetch(`http://localhost:3001/posts/${props.post._id}`,
            { method: 'DELETE' })
            .then(() => {
                props.getPostsFromNode();
            });
    }

    return (
        <div className="card text-white bg-dark my-3 text-start">
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">{localDate + " " + localTime}</h6>
                <p className="card-text">{props.post.content}</p>
                <a href="#" className="card-link" onClick={deleteHandler} >Delete</a>
            </div>
        </div>
    )
}