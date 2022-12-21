drop database pollv3;
create database pollv3 ;
use pollv3;
create table users(
    email varchar(50) not null,
    hashpw varchar(64),
    saltpw varchar(32),
    Primary key(email));
create table Polls(
    poll_id int not null auto_increment, 
    title varchar(45) not null,
    email varchar(50) not null ,
     CONSTRAINT poll_creator FOREIGN KEY (email)
     REFERENCES users (email) ON  DELETE CASCADE ON UPDATE CASCADE ,Primary key(poll_id)
);
create table Questions(
    question_id int not null auto_increment,
    qtext varchar(100) not null,
    qtype ENUM("profile","question") ,
    poll_id int not null ,
    required boolean default false not  null ,
     sequence varchar(2) not  null ,
     CONSTRAINT question_poll FOREIGN KEY (poll_id)
     REFERENCES Polls (poll_id) ON  DELETE CASCADE ON UPDATE CASCADE ,Primary key(question_id)

);
create table answers(
    answer_id int not null auto_increment  ,
    atext varchar(25) not null ,
    question_id int not null ,
    depented_qid int ,
   sequence varchar(1) not null ,
     CONSTRAINT answer_question FOREIGN KEY (question_id)
     REFERENCES Questions (question_id) ON  DELETE CASCADE ON UPDATE CASCADE,
     CONSTRAINT answer_depnetd_question FOREIGN KEY (depented_qid)
     REFERENCES Questions (question_id) ON  DELETE CASCADE ON UPDATE CASCADE ,Primary key(answer_id)


);
create table report_answers(
    report_id int not null auto_increment,
    session_id  varchar(32)  not null,
    poll_id int not null ,
     CONSTRAINT session_polls FOREIGN KEY (poll_id)
     REFERENCES Polls (poll_id) ON  DELETE CASCADE ON UPDATE CASCADE ,Primary key(report_id)

);
create table reportforstats(
    report_id int not null,
    question_id int not null ,
    answer_id int not null ,
    CONSTRAINT analitics_reports FOREIGN KEY (report_id)
    REFERENCES report_answers (report_id) ON  DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT report_question FOREIGN KEY (question_id)
    REFERENCES Questions (question_id) ON  DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT report_answer_reference FOREIGN KEY (answer_id)
    REFERENCES answers(answer_id) ON  DELETE CASCADE ON UPDATE CASCADE
);
create table reportfornotstats(
    report_id int not null,
    question_id int not null ,
    answer_text varchar(25) ,
    CONSTRAINT non_stat_reports_1 FOREIGN KEY (report_id)
    REFERENCES report_answers (report_id) ON  DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT report_question_1 FOREIGN KEY (question_id)
    REFERENCES Questions (question_id) ON  DELETE CASCADE ON UPDATE CASCADE
);
