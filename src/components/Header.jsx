import img2 from "../image/img2.jpg";
const Header = ()=>{

    return(
        <>
          <header>
            <img src={img2} alt="logo" text="logo" />
            <h3 style={{ color: "blue", marginRight:"20px" }}>DriveEase</h3>
        
        </header>
        </>
    )



}
export default Header;