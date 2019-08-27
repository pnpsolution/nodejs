CREATE TABLE ex.sc_user (
   user_email VARCHAR(50),
   user_password VARCHAR(20),
  PRIMARY KEY (user_email)
) ENGINE = InnoDB ROW_FORMAT = DEFAULT;