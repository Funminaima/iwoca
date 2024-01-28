import { useEffect, useState } from "react";
import SingleApplication from "./SingleApplication";
import { getApplication } from "./apiCalls/api";
import { IApplication } from "./type";
import styles from "./Applications.module.css";
import { Button } from "./ui/Button/Button";

const Applications = () => {
  const [data, setData] = useState<IApplication[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const responseData = await getApplication(page, limit);
        setData(responseData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [page, limit]);

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <div className={styles.Applications}>
      {data.map((application, index) => (
        <SingleApplication key={index} application={application} />
      ))}

      <Button className="btn" onClick={handleLoadMore}>
        load more
      </Button>
    </div>
  );
};

export default Applications;
