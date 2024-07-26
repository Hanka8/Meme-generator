import ReactLoading from "react-loading";

const Loading: React.FC = () => {
    return (
        <div className="m-8 grid place-items-center">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#f97316"}
            height={100}
            width={80}
          />
        </div>
    )
}

export default Loading;