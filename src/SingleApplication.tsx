import React from "react";
import styles from "./SingleApplication.module.css";
import { IApplication } from "./type";

interface Props {
  application: IApplication;
  extractDateFromTimestamp: (timestamp: string) => string;
}

const SingleApplication = ({
  application,
  extractDateFromTimestamp,
}: Props) => {
  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        {application.company}
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        {application.first_name} {application.last_name}
      </div>
      <div className={`${styles.cell} ${styles.email}`}>
        <sub>Email</sub>
        {application.email}
      </div>
      <div className={styles.cell}>
        <sub>Loan Amount</sub>
        {application.loan_amount}
      </div>
      <div className={styles.cell}>
        <sub>Application Date</sub>
        {extractDateFromTimestamp(application.date_created)}
      </div>
      <div className={styles.cell}>
        <sub>Expiry date</sub>
        {extractDateFromTimestamp(application.expiry_date)}
      </div>
    </div>
  );
};

export default SingleApplication;
