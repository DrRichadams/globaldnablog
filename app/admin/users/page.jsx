"use client";

import LoadingComp from "@/components/loading-comp";
import styles from "../admin.module.css";
import { db } from "@/app/firebase/config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";

// Fetch users from Firestore
async function fetchUsersFromFirestore() {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  return usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    isSuspending: false,
    isApproving: false,
    ...doc.data(),
  }));
}

export default function Users() {
  const [authors, setAuthors] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(false);

  useEffect(() => {
    async function loadAuthors() {
      setLoadingAuthors(true);
      try {
        const users = await fetchUsersFromFirestore();
        setAuthors(users);
        console.log("Fetched authors:", users);
      } catch (err) {
        setAuthors([]);
      }
      setLoadingAuthors(false);
    }
    loadAuthors();
  }, []);

  if (loadingAuthors) return <LoadingComp message="Loading authors..." />;

  const handleApprove = async (id) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === id ? { ...author, isApproved: true } : author
      )
    );
    await updateDoc(doc(db, "users", id), { isApproved: true });
  };

  const handleApproveTrigger = async (id) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === id ? { ...author, isApproving: true } : author
      )
    );
  };

  const handleSuspend = async (id) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === id
          ? { ...author, isSuspended: !author.isSuspended }
          : author
      )
    );
    await updateDoc(doc(db, "users", id), {
      isSuspended: !authors.find((a) => a.id === id).isSuspended,
    });
  };

  const handleSuspendTrigger = async (id) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === id ? { ...author, isSuspending: true } : author
      )
    );
  };

  return (
    <div className={styles.admin_users_container}>
      <h2>Users Management</h2>
      <p>
        Manage authors and their approval status (Approved users are able to
        write and submit articles, if you want to revoke this access, you can
        suspend their account).
      </p>
      {authors.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>isApproved</th>
              <th>isSuspended</th>
              <th>Approve</th>
              <th>Suspend</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr
                key={author.id}
                style={{
                  backgroundColor: author.isSuspended ? "#f8d7da" : "white",
                }}
              >
                <td>{author.authorName}</td>
                <td>{author.email}</td>
                <td>{author.userType}</td>
                <td>{author.isApproved ? "Yes" : "No"}</td>
                <td>{author.isSuspended ? "Yes" : "No"}</td>
                <td>
                  <div className={styles.approve_button_container}>
                    {author.isApproving ? (
                      <button onClick={() => handleApprove(author.id)}>
                        {/* <p>OK</p> */}
                        <TiTick size={25} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApproveTrigger(author.id)}
                        disabled={author.isApproved}
                      >
                        {author.isApproved ? "Approved" : "Approve"}
                      </button>
                    )}
                  </div>
                </td>
                <td>
                  <div className={styles.suspend_button_container}>
                    {author.isSuspending ? (
                      <button onClick={() => handleSuspend(author.id)}>
                        {/* <p>OK</p> */}
                        <TiTick size={25} />
                      </button>
                    ) : (
                      <button onClick={() => handleSuspendTrigger(author.id)}>
                        {author.isSuspended ? "Unsuspend" : "Suspend"}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}
