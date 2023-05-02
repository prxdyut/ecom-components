import * as React from "react";
import { useSession } from "next-auth/react";
import secureLocalStorage from "react-secure-storage";

export default function App({ children }) {
  const { data: session } = useSession();

  React.useEffect(() => {
    session
      ? () => {
          fetch("/api/customer/" + session.user.email, {
            method: "POST",
            body: JSON.stringify({
              firstname: session.user.name.split(" ")[0],
              lastname: session.user.name.split(" ")[1],
              //   phone: "+919323232961 1",
              //   external_id: "abc 1",
              meta: { image: session.user.image },
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              secureLocalStorage.setItem("user", data);
            });
        }
      : () => {
          secureLocalStorage.removeItem("user");
        };
  }, [session]);

  return (
    <React.Fragment>
      {children}
      {JSON.stringify(session)}
    </React.Fragment>
  );
}
