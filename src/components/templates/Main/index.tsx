import { Header } from 'components/molecules/Header';
import { SideBar } from 'components/molecules/SideBar';
import { FC } from 'react';

export const Main: FC = (props) => {
  return (
    <div>
      <Header />
      <SideBar />
      {props.children}
    </div>
  );
};
