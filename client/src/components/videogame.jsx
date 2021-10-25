export default function Videogame({image, name}) {
    return(
        <div>
            <img src={image} alt="VideogameImage" />
            <h2>{name}</h2>
            {/* <h4>{genres}</h4> */}
        </div>
    )
}