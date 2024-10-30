import { useNavigate } from "react-router-dom";

type DashboardCardProps = { 
  title: string;
  content: string;
  bgColor: string;
  linkTo?: string; 
  onClick?: () => void; 
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, content, bgColor, linkTo, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); 
    } else if (linkTo) {
      navigate(linkTo); 
    }
  };

  return (
    <div
      className={`p-6 ${bgColor} text-white rounded shadow-md cursor-pointer transform transition-transform hover:scale-95`}
      onClick={handleClick}
    >
      <div className="flex items-center mb-4">
        <h2 className="ml-2 text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-lg">{content}</p>
    </div>
  );
};

export default DashboardCard;

  