import { IconType } from 'react-icons';
import { FaFrog } from 'react-icons/fa';
import { IoMdClose, IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';
export type Icon = IconType;

export const Icons = {
  logo: FaFrog,
  close: IoMdClose,
  success: IoIosCheckmarkCircleOutline,
  delete: AiFillDelete,
};
