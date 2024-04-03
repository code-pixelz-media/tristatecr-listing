import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
export function PropertyListingComp(props) {
  return (
    <div className="propertylisting-content">
      <h2>31-57 Vernon Blvd</h2>
      <h4>Astoria</h4>
      <Box sx={{ display: "flex", flexDirection: "column", m: 1 }}>
        <ul className="ul-buttons">
          <li className="bg-blue">
            <span>Retail</span>
          </li>
          <li className="bg-green">
            <span>For Lease</span>
          </li>
          <li className="bg-yellow">
            <span>$60.00/SF</span>
          </li>
        </ul>

        <ul className="ul-content">
          <li>
            {" "}
            <p>Open floor plan</p>{" "}
          </li>
          <li>
            {" "}
            <p>Built out F&B</p>{" "}
          </li>
          <li>
            <p>Large glass window</p>
          </li>
          <li>
            <p>Natural Light</p>
          </li>
          <li>
            <p>Tremendous signage & branding opportunity on Veron Blvd</p>
          </li>
          <li>
            <p>Groudn level: 1,4000SF</p>
          </li>
          <li>
            <p>all uses considered - F&B or fitness is preferred</p>
          </li>
        </ul>
        <ul className="ul-content ul-features">
          <li>
            {" "}
            <p>
              Min Size: <span>2,400.00</span>
            </p>
          </li>
          <li>
            {" "}
            <p>
              Max Size: <span>2,400.00</span>
            </p>
          </li>
          <li>
            {" "}
            <p>
              Zoning <span>R7A, C1-3</span>
            </p>
          </li>
          <li>
            {" "}
            <p>
              Key Tag: <span>Call Mike: 917-838-5686</span>
            </p>
          </li>
          <li>
            {" "}
            <p>
              Listing Agent: <span>Richard Babeck</span>
            </p>
          </li>
          <li>
            {" "}
            <p>
              Vented: <span>YES</span>
            </p>
          </li>
          <li>
            {" "}
            <p>
              Borough: <span>Queens</span>
            </p>
          </li>
        </ul>
        <p className="price">$10,000.00</p>
        <Button variant="outlined" size="medium"> More Info </Button>
      </Box>
    </div>
  );
}
