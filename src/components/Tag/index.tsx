import { ReactNode, MouseEvent } from "react";
import { GrClose } from "react-icons/gr";
import styled from "styled-components";

interface Props {
  selected: boolean;
  value: string;
  onClick: (value: string) => void;
  onClose: (value: string) => void;
  children: ReactNode;
  closeable?: boolean;
  className?: string;
}

const Tag = ({
  selected,
  value,
  onClick,
  onClose,
  children,
  closeable = true,
  className,
}: Props) => {
  const innerOnClick = () => onClick(value);
  const innerOnClose = (event: MouseEvent) => {
    event.stopPropagation();
    onClose(value);
  };

  return (
    <Container
      selected={selected}
      onClick={innerOnClick}
      className={`rounded-full bg-[#f2f4f7] hover:bg-[#e7e9eb] cursor-pointer px-3 py-2 flex justify-center transition-all items-center ${className}`}
    >
      {children}
      {closeable && (
        <GrClose
          color="white"
          onClick={innerOnClose}
          className="cursor-pointer ml-1 mt-[0.5px]"
        />
      )}
    </Container>
  );
};

export default Tag;

const Container = styled.div<{ selected: boolean }>`
  width: fit-content;
  color: ${({ selected }) => (selected ? "var(--primary)" : "#344054")};
`;
