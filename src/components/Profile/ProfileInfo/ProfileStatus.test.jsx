import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="reactMan" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("reactMan ");
    });
    test("after creating span should be displayed", () => {
        const component = create(<ProfileStatus status="reactMan" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after creating input shouldn`t be displayed", () => {
        const component = create(<ProfileStatus status="reactMan" />);
        const root = component.root;
        expect(()=>{
            let input = root.findByType("input");
        }).toThrow();
    });
    test("after creating span should be displayed with correct status", () => {
        const component = create(<ProfileStatus status="reactMan" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("reactMan");
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="reactMan" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onClick();
        let input = root.findByType("input");


        expect( input.props.value).toBe("reactMan");
    });



    test("callback should be called", () => {
        const mockCallBack = jest.fn();
        const component = create(<ProfileStatus status="reactMan" updateUserStatus={mockCallBack}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        //вызвана 1 раз
        expect(mockCallBack.mock.calls.length).toBe(1);
    });


});