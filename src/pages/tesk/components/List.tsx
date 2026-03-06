import CommonList from "../../../components/CommonList"

function List(props: React.ComponentProps<typeof CommonList>){
    return(
        <>
            <CommonList {...props} />
        </>
    )
}


export default List