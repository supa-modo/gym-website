function getInitials(fullName) {
    const names = fullName.split(' ');
    if (names.length > 1) {
      return names[0].charAt(0) + names[names.length - 1].charAt(0);
    } else {
      return names[0].charAt(0);
    }
  }
  