export declare namespace Action {
    interface IAction {
    }
    namespace Label {
        class CreateLabelAction implements IAction {
            categoryId: number;
            startIndex: number;
            endIndex: number;
            constructor(categoryId: number, startIndex: number, endIndex: number);
        }
        function Create(categoryId: number, startIndex: number, endIndex: number): CreateLabelAction;
        class DeleteLabelAction implements IAction {
            id: number;
            constructor(id: number);
        }
        function Delete(id: number): DeleteLabelAction;
        class UpdateLabelAction implements IAction {
            labelId: number;
            categoryId: number;
            constructor(labelId: number, categoryId: number);
        }
        function Update(labelId: number, categoryId: number): UpdateLabelAction;
    }
    namespace Connection {
        class CreateConnectionAction implements IAction {
            categoryId: number;
            fromId: number;
            toId: number;
            constructor(categoryId: number, fromId: number, toId: number);
        }
        function Create(categoryId: number, fromId: number, toId: number): CreateConnectionAction;
        class DeleteConnectionAction implements IAction {
            id: number;
            constructor(id: number);
        }
        function Delete(id: number): DeleteConnectionAction;
        class UpdateConnectionAction implements IAction {
            connectionId: number;
            categoryId: number;
            constructor(connectionId: number, categoryId: number);
        }
        function Update(connectionId: number, categoryId: number): UpdateConnectionAction;
    }
}
