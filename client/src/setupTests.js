// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from "react";
// import { configure, shallow } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
import Home from './components/Home/Home'
import SearchBar from './components/SearchBar/SearchBar';
import Videogames from './components/Videogames/Videogames';
import {configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
// import Adapter from '@wojtekmaj/enzyme-adapter-react-16';

describe("<Home />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });
  it("should render a component <SearchBar/>", () => {
    expect(wrapper.find(SearchBar)).toHaveLength(1);
  });
  it("should render a component <Videogames/>", () => {
    expect(wrapper.find(Videogames)).toHaveLength(1);
  });
});
