import { Component } from "@angular/core";
import { User } from "./user";
import { EnrollmentService } from "./enrollment.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  topics = ["Angular", "React", "Vue"];
  topicHasError = true;
  submitted = false;
  message = {
    status: "",
    contents: {
      text: "",
      url: ""
    }
  };

  userModel = new User(
    "Rob",
    "rob@test.com",
    5556665566,
    "default",
    "morning",
    true
  );

  constructor(private _enrollmentService: EnrollmentService) {}

  validateTopic(value) {
    if (value === "default") {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  onSubmit() {
    console.log("userModel", this.userModel);
    this.submitted = true;
    this._enrollmentService.enroll(this.userModel).subscribe(
      data => {
        console.log("Success!", data);
        this.message = {
          status: "Success!",
          contents: {
            text: data,
            url: this._enrollmentService.url
          }
        };
      },
      error => {
        console.error("Error!", error);
        this.message = {
          status: "Failed!",
          contents: {
            text: error.statusText,
            url: error.url
          }
        };
      }
    );
  }
}
