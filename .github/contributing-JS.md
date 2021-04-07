## JS Contribution Guidelines

Code readability and compatibility is paramound to the application. Thusly, it is important that all contributed code is thoroughly tested before being merged into master. Coding in JS requires the following standards:

1. [React Hooks](https://reactjs.org/docs/hooks-intro.html)

   NO use of "this" keyword to be found, nor classes. No use of componentdidmount(), or other.

2. **ES6 Arrow Functions Only**

   These function exactly the same as traditional classes but remove code bloat.

3. **Componentization**

   That which can be used elsewhere should be. When code is reused (sometimes identically), it is better in a separate file and imported for reuse.
   However, to address components folder bloat, ONLY the components which are reused elsewhere are required to be placed into individual files.

4. **Model-Viewer-Controller Format**

   All blocks of code can be condensed into components - whether included in the file or imported. The primary component in a file should be used as a "summary" of the underlying components to enable a birds eye view of the file structure. This is a great architecture to individual files (if possible) and the overall file structure of the codebase.

5. **Clear and Obvious Variable Names**

   Variables should follow the general syntax of camelCase, describe nearly what they're doing (even at the price of brevity). Single-letter variables should not be used. Naming conventions for event handlers should be somethingEventHandler, eg. "onDeleteHandler".

6. **Useful Commenting Only**

   Code, as a general rule, should be fair and readable without requiring excessive commentation. This functions two ways: Code which could become confusing should be commented above its line. Code which should be obvious should not be commented for the sake of commenting, eg "Returns this" above the return block.

## An Example.

````import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { AuthContext } from "../auth/Auth";
import Toolbar from "../shared/Toolbar";

export const ExampleScreen = (props) => {
  return (
    <View>
      {admin && <AdminPanel />}
      <UserPanel />
      <Toolbar />
    </View>
  );
};

const AdminPanel = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <View>
      <Text>This is the Admin Panel</Text>
    </View>
  );
};

const UserPanel = (props) => {
  const auth = useContext(AuthContext);

  const displayTimeHandler = (time) => {
    return (
      <Text>
        Hello {auth.user}, it's ${time}
      </Text>
    );
  };

  return (
    <View>
      <Text>Hello {auth.user}</Text>
      <Button onPress={displayTimeHandler} />
    </View>
  );
};

const styles = StyleSheet.create({});```
````
