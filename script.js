let coursesList = [];
let studentsList = [];
let trainersList = [];
let assignmentsList = [];
let studId = 0;
let trainId = 0;
let assignId = 0;
let editCourseTitle;
let editStudentId;
let editTraienrId;
let editAssignmentId;

$(document).ready(function () {
  // display only the home page when click the logo
  $("#home-page").on("click", function () {
    $(".home-page").removeClass("not-display");
    $(".courses-page").addClass("not-display");
    $(".students-page").addClass("not-display");
    $(".trainers-page").addClass("not-display");
    $(".assignments-page").addClass("not-display");
  });

  // display only the courses page when click the courses in navbar or the go to courses button
  $(".cour-page").on("click", function () {
    $(".home-page").addClass("not-display");
    $(".courses-page").removeClass("not-display");
    $(".students-page").addClass("not-display");
    $(".trainers-page").addClass("not-display");
    $(".assignments-page").addClass("not-display");
  });

  // display only the students page when click the students in navbar or the go to students button
  $(".stud-page").on("click", function () {
    $(".home-page").addClass("not-display");
    $(".courses-page").addClass("not-display");
    $(".students-page").removeClass("not-display");
    $(".trainers-page").addClass("not-display");
    $(".assignments-page").addClass("not-display");
  });

  // display only the trainers page when click the traiers in navbar or the go to trainers button
  $(".train-page").on("click", function () {
    $(".home-page").addClass("not-display");
    $(".courses-page").addClass("not-display");
    $(".students-page").addClass("not-display");
    $(".trainers-page").removeClass("not-display");
    $(".assignments-page").addClass("not-display");
  });

  // display only the assignments page when click the assignments in navbar or the go to assignments button
  $(".ass-page").on("click", function () {
    $(".home-page").addClass("not-display");
    $(".courses-page").addClass("not-display");
    $(".students-page").addClass("not-display");
    $(".trainers-page").addClass("not-display");
    $(".assignments-page").removeClass("not-display");
  });

  // ***********************************************************
  // ***********************************************************
  // ***********************************************************
  // general functions

  // capitalize the inputs
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  };

  // delete the course from studentList
  const deleteCourseFromStudentList = function (courseTitle) {
    for (let i in studentsList) {
      for (let j in studentsList[i][5]) {
        if (courseTitle === studentsList[i][5][j]) {
          studentsList[i][5].splice(j, 1);
        }
      }
    }
  };

  // delete the course from trainersList
  const deleteCourseFromTrainersList = function (courseTitle) {
    for (let i in trainersList) {
      for (let j in trainersList[i][4]) {
        if (courseTitle === trainersList[i][4][j]) {
          trainersList[i][4].splice(j, 1);
        }
      }
    }
  };

  // delete the course from assignmentsList
  const deleteCourseFromAssignmentList = function (courseTitle) {
    for (let i in assignmentsList) {
      for (let j in assignmentsList[i][7]) {
        if (courseTitle === assignmentsList[i][7][j]) {
          assignmentsList[i][7].splice(j, 1);
        }
      }
    }
  };

  // delete course from courseList
  const deleteCourseFromCoursesList = function (courseTitle) {
    for (let i in coursesList) {
      if (courseTitle === coursesList[i][0]) {
        coursesList.splice(i, 1);
      }
    }
  };

  // course choices in student's, trainer's, assignment's select
  const CourseChoices = function () {
    for (let i in coursesList) {
      courseChoice = coursesList[i][0];
      $(".course-select").append(
        `<option class='course-options' code='` +
          courseChoice +
          `' >` +
          courseChoice +
          `</option>`
      );
    }
  };

  // *******************************************************************
  // *******************************************************************
  // *******************************************************************
  // modals

  // *****************************************************************
  // modal for description
  // get the modal span
  let descriptionSpan = document.getElementsByClassName("close-description")[0];
  // modal for description
  let desModal = document.getElementById("myModal-description");
  // When the user clicks on <span> (x), close the modal
  descriptionSpan.onclick = function () {
    desModal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == desModal) {
      desModal.style.display = "none";
    }
  };

  // course description
  $("#course-list").on("click", ".btn-description", function () {
    let courseDescripton = $(this).closest("tr").attr("description");
    $("#modal-text").text(courseDescripton);
    desModal.style.display = "block";
  });

  // *****************************************************************
  // *****************************************************************
  // modal for course students

  // get the modal span
  let studentSpan = document.getElementsByClassName("close-student")[0];
  // modal for course student
  let studentsModal = document.getElementById("myModal-students");
  // When the user clicks on <span> (x), close the modal
  studentSpan.onclick = function () {
    studentsModal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == studentsModal) {
      studentsModal.style.display = "none";
    }
  };

  // found students and made a list
  const courseStudents = function (courseTitle) {
    let studentsDataList = "";
    for (let i in studentsList) {
      for (let j in studentsList[i][5]) {
        if (courseTitle == studentsList[i][5][j]) {
          studentsDataList +=
            "<li class='course-students'>" +
            studentsList[i][1] +
            " " +
            studentsList[i][2] +
            "</li>";
        }
      }
    }
    return studentsDataList;
  };

  // course students
  $("#course-list").on("click", ".btn-student", function () {
    // clear the list
    $(".course-students").remove();
    let courseTitle = $(this).closest("tr").attr("code");
    // found the student
    let students = courseStudents(courseTitle);
    // append the student in student list
    $("#course-students-list").append(students);
    // whrite the header
    $("#students-modal-header").text(courseTitle + " " + "Students");
    studentsModal.style.display = "block";
  });

  // *****************************************************************
  // *****************************************************************
  // modal for course trainers

  // get the modal span
  let trainerSpan = document.getElementsByClassName("close-trainer")[0];
  // modal for course student
  let trainerModal = document.getElementById("myModal-trainers");
  // When the user clicks on (x), close the modal
  trainerSpan.onclick = function () {
    trainerModal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == trainerModal) {
      trainerModal.style.display = "none";
    }
  };

  // found trainers and made a list
  const courseTrainers = function (courseTitle) {
    let trainersDataList = "";
    for (let i in trainersList) {
      for (let j in trainersList[i][4]) {
        if (courseTitle == trainersList[i][4][j]) {
          trainersDataList +=
            "<li class='course-trainers'>" +
            trainersList[i][1] +
            " " +
            trainersList[i][2] +
            "</li>";
        }
      }
    }
    return trainersDataList;
  };

  // course trainers
  $("#course-list").on("click", ".btn-trainer", function () {
    // clear the list
    $(".course-trainers").remove();
    let courseTitle = $(this).closest("tr").attr("code");
    // fund the trainer
    let trainers = courseTrainers(courseTitle);
    // append the trianr in trainers list
    $("#course-trainers-list").append(trainers);
    $("#trainers-modal-header").text(courseTitle + " " + "Trainers");
    trainerModal.style.display = "block";
  });

  // *****************************************************************
  // *****************************************************************
  // modal for course assignments

  // get the modal span
  let assignmentsSpan = document.getElementsByClassName("close-assignemnt")[0];
  // modal for course student
  let assignmentModal = document.getElementById("myModal-assignments");
  // When the user clicks on (x), close the modal
  assignmentsSpan.onclick = function () {
    assignmentModal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == assignmentModal) {
      assignmentModal.style.display = "none";
    }
  };

  // found assignments and made a list
  const courseAssignments = function (courseTitle) {
    let assignmentsDataList = "";
    for (let i in assignmentsList) {
      for (let j in assignmentsList[i][7]) {
        if (courseTitle == assignmentsList[i][7][j]) {
          assignmentsDataList +=
            `<li class='course-assignments'>` + assignmentsList[i][1] + `</li>`;
        }
      }
    }
    return assignmentsDataList;
  };

  // course assignments
  $("#course-list").on("click", ".btn-assignment", function () {
    // clear the list
    $(".course-assignments").remove();
    let courseTitle = $(this).closest("tr").attr("code");
    let assignments = courseAssignments(courseTitle);
    $("#course-assignments-list").append(assignments);
    $("#assignments-modal-header").text(courseTitle + " " + "Assignments");
    assignmentModal.style.display = "block";
  });

  // *****************************************************************
  // *****************************************************************
  // modal for assignments per students per course

  // get the modal span
  let courseAssignmentsStudentsSpan = document.getElementsByClassName(
    "close-assignemnts-per-students"
  )[0];
  // modal for course student
  let courseAssignmentsStudentsModal = document.getElementById(
    "myModal-assignments-per-students"
  );
  // When the user clicks on (x), close the modal
  courseAssignmentsStudentsSpan.onclick = function () {
    courseAssignmentsStudentsModal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == courseAssignmentsStudentsModal) {
      courseAssignmentsStudentsModal.style.display = "none";
    }
  };

  //
  // found assignments per courses and made a list
  const courseAssignmentsPerStudents = function (courseTitle) {
    let assignmentsPerStudentsDataList = "";
    for (let i in studentsList) {
      for (let j in studentsList[i][5]) {
        if (courseTitle == studentsList[i][5][j]) {
          let assignData = courseAssignments(courseTitle);
          assignmentsPerStudentsDataList +=
            `<li class='course-assign-per-stud'>` +
            studentsList[i][1] +
            " " +
            studentsList[i][2] +
            `<ul>` +
            assignData +
            `</ul></li>`;
        }
      }
    }
    return assignmentsPerStudentsDataList;
  };

  //assignments per students per course
  $("#course-list").on("click", ".btn-assignments-per-students", function () {
    // clear the list
    $(".course-assign-per-stud").remove();
    let courseTitle = $(this).closest("tr").attr("code");
    let courseAssignPerStud = courseAssignmentsPerStudents(courseTitle);
    $("#course-assignments-per-students-list").append(courseAssignPerStud);
    $("#assignments-students-modal-header").text(
      courseTitle + " " + "Assignments per Students"
    );
    courseAssignmentsStudentsModal.style.display = "block";
  });

  // ***********************************************************
  // ***********************************************************
  // ***********************************************************
  // courses

  // dispaly the course's form when click the add button
  $("#add-course-button").on("click", function () {
    $("#my-course-form").removeClass("not-display");
    $("#add-course-button").addClass("not-display");
  });

  // retrive course's info & add the course in Courses object
  const courseInfo = function () {
    let title = $("#course-title").val().trim().toUpperCase();
    let language = $("#language").val().trim().capitalize();
    let type = $("#type").val().trim().capitalize();
    let description = $("#course-description").val().trim();
    if ($(".submit-course").hasClass("edit")) {
      let course = updateCourse(title, language, type, description);
      return course;
    } else {
      let course = [];
      course.push(title);
      course.push(language);
      course.push(type);
      course.push(description);
      return course;
    }
  };

  // full a new course's table row
  const fullCourseRow = function (course) {
    $("#course-table").append(
      `
            <tr class= "table-row-course" code ='` +
        course[0] +
        `' language ='` +
        course[1] +
        `' type ='` +
        course[2] +
        `' description ='` +
        course[3] +
        `'>
            <th scope="row">` +
        course[0] +
        `</th>
            <td>` +
        course[1] +
        `</td>
            <td>` +
        course[2] +
        `</td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-description">
                Description
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-student">
                Students
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-trainer">
                Trainers
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-assignment">
                Assignments
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-assignments-per-students">
                Assignments per students
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-edit-course">
                Edit
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-delete-course">
                Delete
              </button>
            </td>
          </tr>
  `
    );
  };

  // refresh courses table
  const refreshCoursesTable = function () {
    for (let i in coursesList) {
      fullCourseRow(coursesList[i]);
    }
  };

  // on submit course form
  $(".submit-course").on("click", function () {
    // get the course info and enter in a variable
    let mycourse = courseInfo();
    if (courseValidation(mycourse)) {
      if ($(".submit-course").hasClass("edit") === false) {
        coursesList.push(mycourse);
      }
      // hide the course form
      $("#my-course-form").addClass("not-display");
      // show the add course button
      $("#add-course-button").removeClass("not-display");
      // clear the table
      $(".table-row-course").remove();
      // add the course in the course tale
      refreshCoursesTable();
      // clear the course choices for students, trainers, assignments
      $(".course-options").remove();
      // show the new choices
      CourseChoices();
      // clear form's values
      $("#my-course-form").trigger("reset");
      // remove class edit
      $(".submit-course").removeClass("edit");
      $("#course-title").attr("readonly", false);
    }
  });

  // delete courses
  $("#course-list").on("click", ".btn-delete-course", function () {
    let delCourse = $(this).closest("tr").attr("code");
    // delete the course from coursesList
    deleteCourseFromCoursesList(delCourse);
    // delete the course from studentList
    deleteCourseFromStudentList(delCourse);
    // delete the course from trainerList
    deleteCourseFromTrainersList(delCourse);
    // delete the course from assignmentsList
    deleteCourseFromAssignmentList(delCourse);
    // clear the tables
    $(".table-row-student").remove();
    $(".table-row-trainer").remove();
    $(".table-row-assignment").remove();
    // refresh the tables
    refreshStudentsTable();
    refreshTrainerTable();
    refreshAssignmentTable();
    // clean the table row
    $(this).closest("tr").remove();
    // clean the courses options for (students, traienrs, assignments)
    $(".course-options").remove();
    // show the new choices
    CourseChoices();
  });

  // foul and despaly the course form when click the eddit button
  $("#course-list").on("click", ".btn-edit-course", function () {
    $(".submit-course").addClass("edit");
    // show the course form
    $("#my-course-form").removeClass("not-display");
    // hide the add course button
    $("#add-course-button").addClass("not-display");
    // retrieve the values for the updated course
    editCourseTitle = $(this).closest("tr").attr("code");
    let editCourseLanguage = $(this).closest("tr").attr("language");
    let editCourseType = $(this).closest("tr").attr("type");
    let editCourseDescription = $(this).closest("tr").attr("description");

    // put the values in the form
    $("#course-title").val(editCourseTitle);
    // the title is the course id so you can't change it
    $("#course-title").attr("readonly", true);
    $("#language").val(editCourseLanguage);
    $("#type").val(editCourseType);
    $("#course-description").val(editCourseDescription);
    $("#my-course-form").removeClass("not-display");
    $("#add-course-button").addClass("not-display");
    // remove the old course
    // deleteCourseFromCoursesList(editCourseTitle);
    $(".table-row-student").remove();
    // refresh the student table
    // refreshStudentsTable();
    $(this).closest("tr").remove();
    $(".course-options").remove();
    CourseChoices();
  });

  // add changes for updated course in coursesList
  const updateCourse = function (
    editCourseTitle,
    editCourseLanguage,
    editCourseType,
    editCourseDescription
  ) {
    for (let i in coursesList) {
      if (editCourseTitle === coursesList[i][0]) {
        coursesList[i].splice(
          1,
          3,
          editCourseLanguage,
          editCourseType,
          editCourseDescription
        );
        return coursesList[i];
      }
    }
  };
  //***********************************************************
  // course validation
  //***********************************************************
  const courseValidation = function (course) {
    if (
      courseTitleValidation(course[0]) &&
      courseLanguageValidation(course[1]) &&
      courseTypeValidation(course[2])
    ) {
      return true;
    }
    return false;
  };

  // title validation
  const courseTitleValidation = function (title) {
    if (title === "") {
      $("#sm-course-title").html("!!! Must feel the Title !!!");
      $("#course-title-validation").removeClass("success");
      $("#course-title-validation").addClass("error");
      return false;
    }
    // check for title's lenght
    if (title.length > 10) {
      $("#sm-course-title").html("!!! Title must be up to ten characters !!!");
      $("#course-title-validation").removeClass("success");
      $("#course-title-validation").addClass("error");
      return false;
    }
    // check if the title allready exists, only if we do not edit
    if ($(".submit-course").hasClass("edit") === false) {
      for (let i in coursesList) {
        if (title === coursesList[i][0]) {
          $("#sm-course-title").html("!!! This title allready exists !!!");
          $("#course-title-validation").removeClass("success");
          $("#course-title-validation").addClass("error");
          return false;
        }
      }
    }

    $("#course-title-validation").removeClass("error");
    $("#course-language-validation").removeClass("error");
    $("#course-type-validation").removeClass("error");
    $("#course-title-validation").addClass("success");
    return true;
  };
  // validate language
  const courseLanguageValidation = function (language) {
    if (language === "") {
      $("#sm-course-language").html("!!! Must feel the course language !!!");
      $("#course-language-validation").removeClass("success");
      $("#course-language-validation").addClass("error");
      return false;
    }
    if (language.lenght > 15) {
      $("#sm-course-language").html(
        "!!! Language must be up to fifteen characters !!!"
      );
      $("#course-language-validation").removeClass("success");
      $("#course-language-validation").addClass("error");
      return false;
    }
    $("#course-language-validation").removeClass("error");
    $("#course-type-validation").removeClass("error");
    $("#course-language-validation").addClass("success");
    return true;
  };
  // type validation
  const courseTypeValidation = function (type) {
    if (type === "") {
      $("#sm-course-type").html("!!! Must feel the course type !!!");
      $("#course-type-validation").removeClass("success");
      $("#course-type-validation").addClass("error");
      return false;
    }
    if (type.length > 15) {
      $("#sm-course-type").html(
        "!!! Type must be up to fifteen characters !!!"
      );
      $("#course-type-validation").removeClass("success");
      $("#course-type-validation").addClass("error");
      return false;
    }
    $("#course-type-validation").removeClass("error");
    $("#course-type-validation").addClass("success");
    return true;
  };

  // *******************************************************
  // *******************************************************
  // *******************************************************
  // students

  // dispaly the student's form when click the add button
  $("#add-student-button").on("click", function () {
    $("#my-student-form").removeClass("not-display");
    $("#add-student-button").addClass("not-display");
  });

  // retrive student's info & add the student in studentsList
  const studentInfo = function () {
    let firstname = $("#stud-firstname").val().trim().capitalize();
    let lastname = $("#stud-lastname").val().trim().capitalize();
    let birtdate = $("#stud-birtdate").val();
    let tuitions = $("#stud-tuitions").val().trim();
    let studentCourse = $("#stud-course").val();
    if ($("#submit-student-form").hasClass("edit")) {
      let student = updateStudent(
        editStudentId,
        firstname,
        lastname,
        birtdate,
        tuitions,
        studentCourse
      );
      return student;
    } else {
      let student = [];
      studId += 1;
      student.push(studId);
      student.push(firstname);
      student.push(lastname);
      student.push(birtdate);
      student.push(tuitions);
      student.push(studentCourse);
      return student;
    }

    // return student;
  };

  // refresh the student table
  const refreshStudentsTable = function () {
    for (let i in studentsList) {
      fullStudentRow(studentsList[i]);
    }
  };

  // present student's courses in student table
  const presentStudentCourses = function (student) {
    let studentCoursesData = "";
    student[5].forEach((course) => {
      studentCoursesData += "<li>" + course + "</li>";
    });
    return studentCoursesData;
  };

  // full a new student's table row
  const fullStudentRow = function (student) {
    studCourseData = presentStudentCourses(student);
    $("#student-table").append(
      `
            <tr class= "table-row-student" id ='` +
        student[0] +
        `' firstname ='` +
        student[1] +
        `' lastname ='` +
        student[2] +
        `' birtdate ='` +
        student[3] +
        `' tuitions ='` +
        student[4] +
        `' courses ='` +
        student[5] +
        `'>
            <th scope="row">` +
        student[0] +
        `</th>
            <td>` +
        student[1] +
        `</td>
            <td>` +
        student[2] +
        `</td>
            <td>` +
        student[3] +
        `</td>
            <td>` +
        student[4] +
        `</td>
            <td><ol>` +
        studCourseData +
        `</ol></td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-edit-student">
                Edit
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-delete-student">
                Delete
              </button>
            </td>
          </tr>
  `
    );
  };

  // on submit student form
  $(".submit-student").on("click", function () {
    // get the student info
    let student = studentInfo();
    if (studentValidation(student)) {
      if ($("#submit-student-form").hasClass("edit") === false) {
        studentsList.push(student);
      }
      // hide the student form
      $("#my-student-form").addClass("not-display");
      // show the add student button
      $("#add-student-button").removeClass("not-display");
      // clear the table
      $(".table-row-student").remove();
      // full the table
      refreshStudentsTable();
      // clear the form
      $("#my-student-form").trigger("reset");
      $(".submit-student").removeClass("edit");
      // remove error class from small tag
      $("#student-fname-validation").removeClass("error");
      $("#student-lname-validation").removeClass("error");
      $("#student-bdate-validation").removeClass("error");
    }
  });

  // student form validation
  const studentValidation = function (student) {
    if (
      studentFirstNameValidation(student[1]) &&
      studentLastNameValidation(student[2]) &&
      studentBirtdateValidation(student[3]) // &&
    ) {
      return true;
    }
    return false;
  };
  // student's first name validation
  const studentFirstNameValidation = function (firstName) {
    let letters = /^[A-Za-z]+$/;
    if (firstName === "") {
      $("#sm-student-fname").html("!!! Student must have first name !!!");
      $("#student-fname-validation").removeClass("success");
      $("#student-fname-validation").addClass("error");
      return false;
    }
    if (firstName.length > 15) {
      $("#sm-student-fname").html(
        "!!! Student's first name must be up to fifteen characters !!!"
      );
      $("#student-fname-validation").removeClass("success");
      $("#student-fname-validation").addClass("error");
      return false;
    }
    if (!firstName.match(letters)) {
      $("#sm-student-fname").html(
        "!!! Student's first name should have only letters !!!"
      );
      $("#student-fname-validation").removeClass("success");
      $("#student-fname-validation").addClass("error");
      return false;
    }
    $("#student-fname-validation").removeClass("error");
    $("#student-lname-validation").removeClass("error");
    $("#student-bdate-validation").removeClass("error");
    $("#student-tuitions-validation").removeClass("error");
    $("#student-fname-validation").addClass("success");
    return true;
  };
  // student's last name validation
  const studentLastNameValidation = function (lastName) {
    let letters = /^[A-Za-z]+$/;
    if (lastName === "") {
      $("#sm-student-lname").html("!!! Student must have last name !!!");
      $("#student-lname-validation").removeClass("success");
      $("#student-lname-validation").addClass("error");
      return false;
    }
    if (lastName.length > 15) {
      $("#sm-student-lname").html(
        "!!! Student's last name should be up to fifteen characters !!!"
      );
      $("#student-lname-validation").removeClass("success");
      $("#student-lname-validation").addClass("error");
      return false;
    }
    if (!lastName.match(letters)) {
      $("#sm-student-lname").html(
        "!!! Student's last name should have only letters !!!"
      );
      $("#student-lname-validation").removeClass("success");
      $("#student-lname-validation").addClass("error");
      return false;
    }
    $("#student-lname-validation").removeClass("error");
    $("#student-bdate-validation").removeClass("error");
    $("#student-tuitions-validation").removeClass("error");
    $("#student-lname-validation").addClass("success");
    return true;
  };
  // student's birth date validation
  const studentBirtdateValidation = function (bdate) {
    if (bdate === "") {
      $("#sm-student-bdate").html("!!! Student must have birt date !!!");
      $("#student-bdate-validation").removeClass("success");
      $("#student-bdate-validation").addClass("error");
      return false;
    }
    $("#student-bdate-validation").removeClass("error");
    $("#student-tuitions-validation").removeClass("error");
    $("#student-bdate-validation").addClass("success");
    return true;
  };

  // delete student from sudenList
  const deleteStudentFromStudentList = function (studentId) {
    for (let i in studentsList) {
      if (studentId == studentsList[i][0]) {
        studentsList.splice(i, 1);
      }
    }
  };

  // delete student
  $("#student-list").on("click", ".btn-delete-student", function () {
    // get the student id
    let delStudentId = $(this).closest("tr").attr("id");
    // delete this student from studentsList
    deleteStudentFromStudentList(delStudentId);
    $(".table-row-student").remove();
    // refresh the student table
    refreshStudentsTable();
  });

  // foul and desplay the student form when click the edit button
  $("#student-list").on("click", ".btn-edit-student", function () {
    $("#my-student-form").removeClass("not-display");
    $("#add-student-button").addClass("not-display");
    $("#submit-student-form").addClass("edit");
    // retrive the values from the updated student

    editStudentId = $(this).closest("tr").attr("id");
    let editStudentFirstName = $(this).closest("tr").attr("firstname");
    let editStudentLastName = $(this).closest("tr").attr("lastname");
    let editStudentBirthDate = $(this).closest("tr").attr("birtdate");
    let editStudentTuitions = $(this).closest("tr").attr("tuitions");
    let editStudentCourses = $(this).closest("tr").attr("courses");
    // put the values in the form
    $("#stud-firstname").val(editStudentFirstName);
    $("#stud-lastname").val(editStudentLastName);
    $("#stud-birtdate").val(editStudentBirthDate);
    $("#stud-tuitions").val(editStudentTuitions);
    $("#stud-course").val(editStudentCourses);
  });

  // add changes for updated student in studentsList
  const updateStudent = function (
    editStudentId,
    firstname,
    lastname,
    birtdate,
    tuitions,
    studentCourse
  ) {
    for (let i in studentsList) {
      if (editStudentId == studentsList[i][0]) {
        studentsList[i].splice(
          1,
          5,
          firstname,
          lastname,
          birtdate,
          tuitions,
          studentCourse
        );
        return studentsList[i];
      }
    }
  };

  // sort by column
  $(".student-table-head").on("click", function () {
    let column = $(this).data("column");
    let order = $(this).data("order");
    // descenting order
    if (order == "desc") {
      $(this).data("order", "asc");
      // sort by is column selection
      studentsList = studentsList.sort((a, b) =>
        a[column] > b[column] ? 1 : -1
      );
    } // ascending order
    else {
      $(this).data("order", "desc");
      // sort by is column selection
      studentsList = studentsList.sort((a, b) =>
        a[column] < b[column] ? 1 : -1
      );
    }
    // clear the student table
    $(".table-row-student").remove();
    // full the student table with the sorted list
    for (let i in studentsList) {
      fullStudentRow(studentsList[i]);
    }
  });

  // *******************************************************
  // *******************************************************
  // *******************************************************
  // trainers

  // dispaly the trainers's form when click the add button
  $("#add-trainer-button").on("click", function () {
    $("#my-trainer-form").removeClass("not-display");
    $("#add-trainer-button").addClass("not-display");
  });

  // retrive trainer's info & add the trainer in trainersList
  const trainerInfo = function () {
    let firstName = $("#trainer-firstname").val().trim().capitalize();
    let lastName = $("#trainer-lastname").val().trim().capitalize();
    let subject = $("#subject").val().trim().capitalize();
    let courses = $("#trainer-course").val();
    if ($("#submit-trainer-form").hasClass("edit")) {
      trainer = updateTrainer(
        editTraienrId,
        firstName,
        lastName,
        subject,
        courses
      );
      // $("#submit-trainer-form").removeClass("edit");
      return trainer;
    } else {
      let trainer = [];
      trainId += 1;
      trainer.push(trainId);
      trainer.push(firstName);
      trainer.push(lastName);
      trainer.push(subject);
      trainer.push(courses);
      return trainer;
    }
  };

  // refresh the trainers table
  const refreshTrainerTable = function () {
    for (let i in trainersList) {
      fullTrainerRow(trainersList[i]);
    }
  };

  // present trainer's courses in trainer table
  const presentTrainerCourses = function (trainer) {
    let trainerCoursesData = "";
    trainer[4].forEach((course) => {
      trainerCoursesData += "<li>" + course + "</li>";
    });
    return trainerCoursesData;
  };

  // full a new trainer's table row
  const fullTrainerRow = function (trainer) {
    traiCourseData = presentTrainerCourses(trainer);
    $("#trainer-table").append(
      `
            <tr class= "table-row-trainer" id ='` +
        trainer[0] +
        `' firstname ='` +
        trainer[1] +
        `' lastname ='` +
        trainer[2] +
        `' subject ='` +
        trainer[3] +
        `'  courses ='` +
        trainer[4] +
        `'>
            <th scope="row">` +
        trainer[0] +
        `</th>
            <td>` +
        trainer[1] +
        `</td>
            <td>` +
        trainer[2] +
        `</td>
            <td>` +
        trainer[3] +
        `</td>
            <td><ol>` +
        traiCourseData +
        `</ol></td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-edit-trainer">
                Edit
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-delete-trainer">
                Delete
              </button>
            </td>
          </tr>
  `
    );
  };

  // on submit trainer form
  $(".submit-trainer").on("click", function () {
    // get the traienr info
    let trainer = trainerInfo();
    if (trainerValidation(trainer)) {
      if ($("#submit-trainer-form").hasClass("edit") === false) {
        trainersList.push(trainer);
      }

      // hide the trainer form
      $("#my-trainer-form").addClass("not-display");
      // show the add trainer button
      $("#add-trainer-button").removeClass("not-display");
      // clear the table
      $(".table-row-trainer").remove();
      // full and sow the new table
      refreshTrainerTable();
      // clear the form
      $("#my-trainer-form").trigger("reset");
      $("#submit-trainer-form").removeClass("edit");
      // remove error class from small tag
      $("#trainer-fname-validation").removeClass("error");
      $("#trainer-lname-validation").removeClass("error");
      $("#trainer-subject-validation").removeClass("error");
    }
  });

  // trainer form validation
  const trainerValidation = function (trainer) {
    if (
      trainerFirstNameValidation(trainer[1]) &&
      trainerLastNameValidation(trainer[2]) &&
      trainerCoursesValidation(trainer[4], trainer[3])
    ) {
      return true;
    }
    return false;
  };

  // trainer first name validation
  const trainerFirstNameValidation = function (firstName) {
    let letters = /^[A-Za-z]+$/;
    if (firstName === "") {
      $("#sm-trainer-fname").html("!!! Trainer must have first name !!!");
      $("#trainer-fname-validation").removeClass("success");
      $("#trainer-fname-validation").addClass("error");
      return false;
    }
    if (firstName.length > 15) {
      $("#sm-trainer-fname").html(
        "!!! Trainer's first name must be up to fifteen characters !!!"
      );
      $("#trainer-fname-validation").removeClass("success");
      $("#trainer-fname-validation").addClass("error");
      return false;
    }
    if (!firstName.match(letters)) {
      $("#sm-trainer-fname").html(
        "!!! Trainer's first name should have only letters !!!"
      );
      $("#trainer-fname-validation").removeClass("success");
      $("#trainer-fname-validation").addClass("error");
      return false;
    }
    $("#trainer-fname-validation").removeClass("error");
    $("#trainer-lname-validation").removeClass("error");
    $("#trainer-subject-validation").removeClass("error");
    $("#trainer-fname-validation").addClass("success");
    return true;
  };
  // trainer's last name validation
  const trainerLastNameValidation = function (lastName) {
    let letters = /^[A-Za-z]+$/;
    if (lastName === "") {
      $("#sm-trainer-lname").html("!!! Trainer must have last name !!!");
      $("#trainer-lname-validation").removeClass("success");
      $("#trainer-lname-validation").addClass("error");
      return false;
    }
    if (lastName.length > 15) {
      $("#sm-trainer-lname").html(
        "!!! Trainer's last name must be up to fifteen characters !!!"
      );
      $("#trainer-lname-validation").removeClass("success");
      $("#trainer-lname-validation").addClass("error");
      return false;
    }
    if (!lastName.match(letters)) {
      $("#sm-trainer-lname").html(
        "!!! Trainer's last name should have only letters !!!"
      );
      $("#trainer-lname-validation").removeClass("success");
      $("#trainer-lname-validation").addClass("error");
      return false;
    }
    $("#trainer-lname-validation").removeClass("error");
    $("#trainer-course-validation").removeClass("error");
    $("#trainer-lname-validation").addClass("success");
    return true;
  };
  // trainer's courses validation
  const trainerCoursesValidation = function (courses, subject) {
    if (courses.length !== 0) {
      if (subject === "") {
        $("#sm-trainer-subject").html(
          "!!! Trainer could not have a course without subject.Please fill the subject !!!"
        );
        $("#trainer-subject-validation").removeClass("success");
        $("#trainer-subject-validation").addClass("error");
        return false;
      }
    }
    $("#trainer-subject-validation").removeClass("error");
    $("#trainer-subject-validation").addClass("success");
    return true;
  };

  // delete trainer from trainerList
  const deleteTrainerFromTrainersList = function (traienrId) {
    for (let i in trainersList) {
      if (traienrId == trainersList[i][0]) {
        trainersList.splice(i, 1);
      }
    }
  };

  // delete trainer
  $("#trainer-list").on("click", ".btn-delete-trainer", function () {
    // get the trainer id
    let delTrainerId = $(this).closest("tr").attr("id");
    // delete this trainer from trainer list
    deleteTrainerFromTrainersList(delTrainerId);
    $(".table-row-trainer").remove();
    // refresh the trainer table
    refreshTrainerTable();
  });

  // foul and desplay the course form when click the eddit button
  $("#trainer-list").on("click", ".btn-edit-trainer", function () {
    $("#my-trainer-form").removeClass("not-display");
    $("#add-trainer-button").addClass("not-display");
    $("#submit-trainer-form").addClass("edit");
    // retrive the values from the updated student
    editTraienrId = $(this).closest("tr").attr("id");
    let editTrainerFirstName = $(this).closest("tr").attr("firstname");
    let editTrainerLastName = $(this).closest("tr").attr("lastname");
    let editTraienrSubject = $(this).closest("tr").attr("subject");
    let editTrainerCourses = $(this).closest("tr").attr("courses");
    // put the values in the form
    $("#trainer-firstname").val(editTrainerFirstName);
    $("#trainer-lastname").val(editTrainerLastName);
    $("#subject").val(editTraienrSubject);
    $("#trainer-course").val(editTrainerCourses);
  });

  // add changes for updated trainer in trainerList
  const updateTrainer = function (
    editTraienrId,
    firstName,
    lastName,
    subject,
    courses
  ) {
    for (let i in trainersList) {
      if (editTraienrId == trainersList[i][0]) {
        trainersList[i].splice(1, 4, firstName, lastName, subject, courses);
        return trainersList[i];
      }
    }
  };

  // sort by column
  $(".trainer-table-head").on("click", function () {
    let column = $(this).data("column");
    let order = $(this).data("order");
    // descenting order
    if (order == "desc") {
      $(this).data("order", "asc");
      // sort by is column selection
      trainersList = trainersList.sort((a, b) =>
        a[column] > b[column] ? 1 : -1
      );
    } // ascending order
    else {
      $(this).data("order", "desc");
      // sort by is column selection
      trainersList = trainersList.sort((a, b) =>
        a[column] < b[column] ? 1 : -1
      );
    }
    $(".table-row-trainer").remove();
    for (let i in trainersList) {
      fullTrainerRow(trainersList[i]);
    }
  });

  // *******************************************************
  // *******************************************************
  // *******************************************************
  // assignments

  // dispaly the trainers's form when click the add button
  $("#add-assignment-button").on("click", function () {
    $("#my-assignment-form").removeClass("not-display");
    $("#add-assignment-button").addClass("not-display");
  });

  // retrive assignment's info & add the trainer in trainersList
  const assignmentInfo = function () {
    let today = new Date();
    let title = $("#title").val().trim().capitalize();
    let submitionDate = $("#submition_date").val();
    let codeMark = $("#code-mark").val();
    let oralMark = $("#oral-mark").val();
    let description = $("#assignment-description").val().trim().capitalize();
    let courses = $("#assignment-course").val();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    if ($("#submit-assignment-form").hasClass("edit")) {
      let assignment = updateAssignments(
        editAssignmentId,
        title,
        date,
        submitionDate,
        codeMark,
        oralMark,
        description,
        courses
      );
      return assignment;
    } else {
      let assignment = [];
      assignId += 1;
      assignment.push(assignId);
      assignment.push(title);
      assignment.push(date);
      assignment.push(submitionDate);
      assignment.push(codeMark);
      assignment.push(oralMark);
      assignment.push(description);
      assignment.push(courses);
      // assignmentsList.push(assignment);
      return assignment;
    }
  };

  // refresh the assignments table
  const refreshAssignmentTable = function () {
    for (let i in assignmentsList) {
      fullAssignmentRow(assignmentsList[i]);
    }
  };

  // present assignemnt's courses in trainer table
  const presentAssignmentCourses = function (assignment) {
    let assignmentCoursesData = "";
    assignment[7].forEach((course) => {
      assignmentCoursesData += "<li>" + course + "</li>";
    });
    return assignmentCoursesData;
  };

  // full a new assignment's table row
  const fullAssignmentRow = function (assignment) {
    assCourseData = presentAssignmentCourses(assignment);
    $("#assignment-table").append(
      `
            <tr class= "table-row-assignment" id ='` +
        assignment[0] +
        `' title ='` +
        assignment[1] +
        `' pubDate ='` +
        assignment[2] +
        `' subDate ='` +
        assignment[3] +
        `' codeMark ='` +
        assignment[4] +
        `' oralMark ='` +
        assignment[5] +
        `' description ='` +
        assignment[6] +
        `' courses ='` +
        assignment[7] +
        `'>
            <th scope="row">` +
        assignment[0] +
        `</th>
            <td>` +
        assignment[1] +
        `</td>
            <td>` +
        assignment[2] +
        `</td>
            <td>` +
        assignment[3] +
        `</td>
            <td>` +
        assignment[4] +
        `</td>
            <td>` +
        assignment[5] +
        `</td>
            <td>` +
        assignment[6] +
        `</td>
            <td><ol>` +
        assCourseData +
        `</ol></td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-edit-assignment">
                Edit
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm btn-delete-assignment">
                Delete
              </button>
            </td>
          </tr>
  `
    );
  };

  // on submit assignment form
  $(".submit-assignment").on("click", function () {
    let assignment = assignmentInfo();
    if (assignmentValidation(assignment)) {
      if ($("#submit-assignment-form").hasClass("edit") === false) {
        assignmentsList.push(assignment);
      }
      // hide the assignment form
      $("#my-assignment-form").addClass("not-display");
      // show the add assignment button
      $("#add-assignment-button").removeClass("not-display");
      // clear the table
      $(".table-row-assignment").remove();
      // full and sow the new table
      refreshAssignmentTable();
      // clear the form
      $("#my-assignment-form").trigger("reset");
      $("#submit-assignment-form").removeClass("edit");
    }
  });

  // assignment validation
  const assignmentValidation = function (assignment) {
    if (
      assignmentTitleValidation(assignment[1]) &&
      assignmentSubDateValidation(assignment[3]) &&
      assignmentCodeMarkValidation(assignment[4]) &&
      assignmentOralMarkValidation(assignment[5]) &&
      assignmentMarksValidation(assignment[4], assignment[5])
    ) {
      return true;
    }
    return false;
  };
  // assignment's title validation
  const assignmentTitleValidation = function (title) {
    if (title === "") {
      $("#sm-assignemnt-title").html("!!! assignment must have title !!!");
      $("#assignment-title-validation").removeClass("success");
      $("#assignment-title-validation").addClass("error");
      return false;
    }
    if (title.length > 25) {
      $("#sm-assignemnt-title").html(
        "!!! Title must be up to twenty five characters !!!"
      );
      $("#assignment-title-validation").removeClass("success");
      $("#assignment-title-validation").addClass("error");
      return false;
    }
    $("#assignment-title-validation").removeClass("error");
    $("#assignment-subDate-validation").removeClass("error");
    $("#assignment-codeMark-validation").removeClass("error");
    $("#assignment-oralMark-validation").removeClass("error");
    $("#assignment-title-validation").addClass("success");
    return true;
  };
  // assignment's submition date validation
  const assignmentSubDateValidation = function (subDate) {
    if (subDate === "") {
      $("#sm-subDate-title").html(
        "!!! assignment must have submition date !!!"
      );
      $("#assignment-subDate-validation").removeClass("success");
      $("#assignment-subDate-validation").addClass("error");
      return false;
    }
    $("#assignment-subDate-validation").removeClass("error");
    $("#assignment-codeMark-validation").removeClass("error");
    $("#assignment-oralMark-validation").removeClass("error");
    $("#assignment-subDate-validation").addClass("success");
    return true;
  };
  // assignment's code mark validation
  const assignmentCodeMarkValidation = function (markCode) {
    if (markCode === "") {
      $("#sm-codeMark-title").html("!!! assignment must have code mark !!!");
      $("#assignment-codeMark-validation").removeClass("success");
      $("#assignment-codeMark-validation").addClass("error");
      return false;
    }
    $("#assignment-codeMark-validation").removeClass("error");
    $("#assignment-oralMark-validation").removeClass("error");
    $("#assignment-codeMark-validation").addClass("success");
    return true;
  };
  // assignment's oral mark validation
  const assignmentOralMarkValidation = function (markOral) {
    if (markOral === "") {
      $("#sm-oralMark-title").html("!!! assignment must have oral mark !!!");
      $("#assignment-oralMark-validation").removeClass("success");
      $("#assignment-oralMark-validation").addClass("error");
      return false;
    }
    $("#assignment-oralMark-validation").removeClass("error");
    $("#assignment-oralMark-validation").addClass("success");
    return true;
  };
  // assignment's marks validation
  const assignmentMarksValidation = function (codeMark, oralMark) {
    if (parseInt(codeMark) + parseInt(oralMark) !== 100) {
      $("#sm-codeMark-title").html(
        `!!! Sum of Marks must be 100. Now is ${
          parseInt(codeMark) + parseInt(oralMark)
        } !!!`
      );
      $("#sm-oralMark-title").html(
        `!!! Sum of Marks must be 100. Now is ${
          parseInt(codeMark) + parseInt(oralMark)
        } !!!`
      );
      $("#assignment-codeMark-validation").removeClass("success");
      $("#assignment-codeMark-validation").addClass("error");
      $("#assignment-oralMark-validation").removeClass("success");
      $("#assignment-oralMark-validation").addClass("error");
      return false;
    }
    $("#assignment-codeMark-validation").removeClass("error");
    $("#assignment-oralMark-validation").removeClass("error");
    $("#assignment-codeMark-validation").addClass("success");
    $("#assignment-oralMark-validation").addClass("success");
    return true;
  };

  // delete assignment from assignemntList
  const deleteAssignmentFromAssignmentList = function (assignmentId) {
    for (let i in assignmentsList) {
      if (assignmentId == assignmentsList[i][0]) {
        assignmentsList.splice(i, 1);
      }
    }
  };

  // delete assignemnt
  $("#assignmemnt-list").on("click", ".btn-delete-assignment", function () {
    // get assignment id
    let delAssignmentId = $(this).closest("tr").attr("id");
    // delete this assignemnt from assignmentList
    deleteAssignmentFromAssignmentList(delAssignmentId);
    $(".table-row-assignment").remove();
    // refresh the trainer table
    refreshAssignmentTable();
  });

  // foul and desplay the assignment form when click the edit button
  $("#assignmemnt-list").on("click", ".btn-edit-assignment", function () {
    $("#my-assignment-form").removeClass("not-display");
    $("#add-assignment-button").addClass("not-display");
    $("#submit-assignment-form").addClass("edit");
    // retrive the values from the update assignment
    editAssignmentId = $(this).closest("tr").attr("id");
    let editAssignmentTitle = $(this).closest("tr").attr("title");
    let editAssignmentSubDate = $(this).closest("tr").attr("subDate");
    let editAssignmentCodeMark = $(this).closest("tr").attr("codeMark");
    let editAssignmentOralMark = $(this).closest("tr").attr("oralMark");
    let editAssignmentDescription = $(this).closest("tr").attr("description");
    let editAssignmentCourses = $(this).closest("tr").attr("courses");
    // put the values in the form
    $("#title").val(editAssignmentTitle);
    $("#submition_date").val(editAssignmentSubDate);
    $("#code-mark").val(editAssignmentCodeMark);
    $("#oral-mark").val(editAssignmentOralMark);
    $("#assignment-description").val(editAssignmentDescription);
    $("#assignment-course").val(editAssignmentCourses);
  });

  // add changes for updated assignments in assignmentsList
  const updateAssignments = function (
    editAssignmentId,
    title,
    date,
    submitionDate,
    codeMark,
    oralMark,
    description,
    courses
  ) {
    for (let i in assignmentsList) {
      if (editAssignmentId == assignmentsList[i][0]) {
        assignmentsList[i].splice(
          1,
          7,
          title,
          date,
          submitionDate,
          codeMark,
          oralMark,
          description,
          courses
        );
        return assignmentsList[i];
      }
    }
  };

  // sort by column
  $(".assignment-table-head").on("click", function () {
    let column = $(this).data("column");
    let order = $(this).data("order");
    // descenting order
    if (order == "desc") {
      $(this).data("order", "asc");
      // sort by is column selection
      assignmentsList = assignmentsList.sort((a, b) =>
        a[column] > b[column] ? 1 : -1
      );
    } // ascending order
    else {
      $(this).data("order", "desc");
      // sort by is column selection
      assignmentsList = assignmentsList.sort((a, b) =>
        a[column] < b[column] ? 1 : -1
      );
    }
    $(".table-row-assignment").remove();
    for (let i in assignmentsList) {
      fullAssignmentRow(assignmentsList[i]);
    }
  });
});
