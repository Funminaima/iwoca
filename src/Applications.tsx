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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const responseData = await getApplication(page, limit);
        setLoading(false);
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
  const extractDateFromTimestamp = (timestamp: string): string => {
    const dateObject = new Date(timestamp);

    const date = dateObject.toISOString().split("T")[0];

    return date;
  };
  const formatCurrency = (currencyString: string | number): string => {
    if (typeof currencyString === "number") {
      currencyString = currencyString.toString();
    }

    const stringWithoutSymbol = currencyString.slice(1);

    const numberWithCommas =
      Number(stringWithoutSymbol).toLocaleString("en-GB");

    const formattedString = `£${numberWithCommas}`;

    return formattedString;
  };

  return (
    <div className={styles.Applications}>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <>
          {data.map((application, index) => (
            <SingleApplication
              key={index}
              application={application}
              extractDateFromTimestamp={extractDateFromTimestamp}
              formatCurrency={formatCurrency}
            />
          ))}
          <Button className="btn" onClick={handleLoadMore}>
            load more
          </Button>
        </>
      )}
    </div>
  );
};

export default Applications;
