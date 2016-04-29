import 'reflect-metadata';
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import * as Rx from 'rxjs/rx';
import {TodoItem} from "../collections/TodoItem";

@Injectable()
export class RequestService {
    constructor(private http: Http) {
    }

    GetTodoItems() {
        let headers = new Headers(); //{ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, url: "http://localhost:3000" });
        return this.http.get("http://localhost:5000/api/todo/index");
    }

    AddTodoItem(id: number, title: string, isDone?: boolean): Rx.Observable<TodoItem[]> {
        let todoitem = new TodoItem(id, isDone, title);
        let body = "{'id':35,'Title':'add todo item', 'isDone':true }"; //JSON.stringify(todoitem);
        let xTodoItemUrl: string = 'http://localhost:5000/api/todo/updateitem/';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(xTodoItemUrl, body, options)
            .map(res => <TodoItem[]>res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Rx.Observable.throw(error.json().error || 'Server error');
    }
}