import React from 'react';
import { BurgerBuilder } from './BurgerBuilder';
// Enzyme -- write unit test, isolated test, test where we dont need to render the complete react app
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()})

describe ('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});