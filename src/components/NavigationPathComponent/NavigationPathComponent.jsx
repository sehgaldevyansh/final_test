import { Breadcrumbs, Link, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
const NavigationPathComponent = ({ paths = [], current }) => {
  const navigate = useNavigate();
  const handleMsilRDClick = (path) => {

    navigate(path);
  };

  const linkMap = paths?.map((path, index) => {
    return (
      <Link
        underline="hover"
        key={index}
        color="#171c8f"
        href="#"
        onClick={e => handleMsilRDClick(path.path)}
        data-testid={`breadcrumb-link-${index}`}
      >
        {path?.name}
      </Link>
    )
  })
  const breadcrumbs = [

    // <Link
    //   underline="hover"
    //   key="2"
    //   color="#171c8f"
    //   href="#"
    //   onClick={handleMsilRDClick}

    // >
    //   {paths[0]?.name}
    // </Link>,
    // <Link
    //   underline="hover"
    //   key="2"
    //   color="#171c8f"
    //   href="#"
    //   onClick={handleMsilRDClick}

    // >
    //   {paths[0]?.name}
    // </Link>,
    ...linkMap,
    <Typography style={{ fontSize: '12px' }} key="3" color="text.primary">
      {current}
    </Typography>,
  ];
  return (
    <div >
      <Breadcrumbs style={{ fontSize: '12px' }} separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  )
}

export default NavigationPathComponent