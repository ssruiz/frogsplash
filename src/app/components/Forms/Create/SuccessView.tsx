import { Button } from '../../shared/Button';
import { Icons } from '../../shared/Icons';

interface Props {
  handleAddAnother?: () => void;
  handleClose: () => void;
  title: string;
}

const SuccessView: React.FC<Props> = ({
  handleAddAnother,
  handleClose,
  title,
}) => {
  return (
    <div className="flex flex-col gap-16 flex-1 w-full items-center animate-jump-in">
      <p className="text-2xl font-medium">{title}</p>
      <Icons.success size={50} className="text-primary" />
      <div className="flex gap-4">
        {handleAddAnother && (
          <Button variant="default" onClick={handleAddAnother}>
            Add Another
          </Button>
        )}
        <Button variant="outline" onClick={handleClose}>
          Go back
        </Button>
      </div>
    </div>
  );
};

export default SuccessView;
